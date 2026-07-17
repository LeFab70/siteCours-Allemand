import {
  Component,
  computed,
  signal,
  OnInit,
  OnDestroy,
  inject,
  DOCUMENT,
  viewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from './reveal.directive';
import { Chatbot } from './chatbot/chatbot';
import { Counter } from './counter/counter';
import {
  LANGUES,
  EXAMENS,
  SERVICES_VISA,
  INFO_CONTACT,
  FRAIS_INSCRIPTION,
  DEBUT_INSCRIPTION,
  AVIS,
  SERVICES,
  SERVICES_NB,
  TARIFS,
  TARIFS_LANGUES,
  COURS_VACANCES,
  TARIF_EXAMENS_INTL,
  IMAGES,
  RESEAUX_SOCIAUX,
} from './data/institut.data';
import emailjs from '@emailjs/browser';
import { environment } from '../environments/environment';

interface Compteur {
  jours: number;
  heures: number;
  minutes: number;
  secondes: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RevealDirective, Chatbot, Counter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private doc = inject(DOCUMENT);

  // ===== Données du flyer =====
  readonly langues = LANGUES;
  readonly examens = EXAMENS;
  readonly servicesVisa = SERVICES_VISA;
  readonly info = INFO_CONTACT;
  readonly frais = FRAIS_INSCRIPTION;
  readonly debut = DEBUT_INSCRIPTION;
  readonly avis = AVIS;
  readonly services = SERVICES;
  readonly servicesNb = SERVICES_NB;
  readonly tarifs = TARIFS;
  readonly tarifsLangues = TARIFS_LANGUES;
  readonly coursVacances = COURS_VACANCES;
  readonly tarifExamens = TARIF_EXAMENS_INTL;
  readonly images = IMAGES;
  readonly reseaux = RESEAUX_SOCIAUX;

  // Note moyenne des avis clients
  readonly noteMoyenne = computed(() => {
    const total = this.avis.reduce((s, a) => s + a.note, 0);
    return Math.round((total / this.avis.length) * 10) / 10;
  });

  // Largeur (%) de remplissage des étoiles pour une note /5
  largeurEtoiles(note: number): number {
    return (note / 5) * 100;
  }

  // ===== Carrousel d'avis =====
  readonly pisteAvis = viewChild<ElementRef<HTMLDivElement>>('pisteAvis');
  readonly indexAvis = signal(0);
  readonly avisEnPause = signal(false);
  private avisTimer?: ReturnType<typeof setInterval>;

  private pasAvis(): number {
    const el = this.pisteAvis()?.nativeElement;
    if (!el) return 0;
    const premier = el.firstElementChild as HTMLElement | null;
    const largeur = premier?.getBoundingClientRect().width ?? el.clientWidth;
    return largeur + 24; // + gap-6
  }

  defilerAvis(direction: number): void {
    const el = this.pisteAvis()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction * this.pasAvis(), behavior: 'smooth' });
  }

  allerAvis(i: number): void {
    const el = this.pisteAvis()?.nativeElement;
    if (!el) return;
    el.scrollTo({ left: i * this.pasAvis(), behavior: 'smooth' });
  }

  onScrollAvis(): void {
    const el = this.pisteAvis()?.nativeElement;
    if (!el) return;
    const pas = this.pasAvis();
    if (pas > 0) this.indexAvis.set(Math.round(el.scrollLeft / pas));
  }

  private avancerAvisAuto(): void {
    if (this.avisEnPause()) return;
    const el = this.pisteAvis()?.nativeElement;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= max - 5) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      this.defilerAvis(1);
    }
  }

  readonly navLinks = [
    { label: 'Accueil', anchor: 'accueil' },
    { label: 'Services', anchor: 'services' },
    { label: 'Langues', anchor: 'langues' },
    { label: 'Examens', anchor: 'examens' },
    { label: 'Tarifs', anchor: 'tarifs' },
    { label: 'Vacances', anchor: 'vacances' },
    { label: 'Visa', anchor: 'visa' },
    { label: 'Avis', anchor: 'avis' },
    { label: 'Contact', anchor: 'contact' },
  ];

  // ===== État de l'interface (signaux) =====
  readonly menuOuvert = signal(false);
  readonly pageDefilee = signal(false);
  readonly afficherHaut = signal(false);
  readonly langueSurvolee = signal<string | null>(null);

  // Filtre interactif des examens par langue
  readonly filtreExamen = signal<string>('Tous');
  readonly languesExamens = computed(() => {
    const set = new Set(this.examens.map((e) => e.langue));
    return ['Tous', ...Array.from(set)];
  });
  readonly examensFiltres = computed(() => {
    const f = this.filtreExamen();
    return f === 'Tous' ? this.examens : this.examens.filter((e) => e.langue === f);
  });

  // ===== Compte à rebours vers le début des inscriptions =====
  readonly compteur = signal<Compteur>({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
  private timer?: ReturnType<typeof setInterval>;
  private cibleInscription = this.calculerCible();

  // ===== Formulaire de contact (signaux) =====
  readonly nom = signal('');
  readonly email = signal('');
  readonly telephone = signal('');
  readonly interet = signal('');
  readonly message = signal('');
  readonly envoiEnCours = signal(false);
  readonly envoye = signal(false);
  readonly erreurEnvoi = signal('');


  readonly nomValide = computed(() => this.nom().trim().length >= 2);
  readonly emailValide = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()));
  readonly messageValide = computed(() => this.message().trim().length >= 10);
  readonly interetValide = computed(() => this.interet().trim().length > 0);
  readonly formulaireValide = computed(
    () =>
      this.nomValide() && this.emailValide() && this.messageValide() && this.interetValide(),
  );

  ngOnInit(): void {
    this.majCompteur();
    this.timer = setInterval(() => this.majCompteur(), 1000);
    this.avisTimer = setInterval(() => this.avancerAvisAuto(), 5000);
    this.doc.defaultView?.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    if (this.avisTimer) clearInterval(this.avisTimer);
    this.doc.defaultView?.removeEventListener('scroll', this.onScroll);
  }

  private onScroll = () => {
    const y = this.doc.defaultView?.scrollY ?? 0;
    this.pageDefilee.set(y > 40);
    this.afficherHaut.set(y > 500);
  };

  remonterEnHaut(): void {
    this.doc.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private calculerCible(): Date {
    const now = new Date();
    let annee = now.getFullYear();
    // 15 juillet ; si déjà passé cette année, viser l'année suivante
    let cible = new Date(annee, 6, 15, 8, 0, 0);
    if (cible.getTime() < now.getTime()) {
      cible = new Date(annee + 1, 6, 15, 8, 0, 0);
    }
    return cible;
  }

  private majCompteur(): void {
    const diff = this.cibleInscription.getTime() - Date.now();
    if (diff <= 0) {
      this.compteur.set({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
      return;
    }
    const jours = Math.floor(diff / 86_400_000);
    const heures = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const secondes = Math.floor((diff % 60_000) / 1000);
    this.compteur.set({ jours, heures, minutes, secondes });
  }

  // ===== Navigation =====
  toggleMenu(): void {
    this.menuOuvert.update((v) => !v);
  }

  scrollTo(anchor: string): void {
    this.menuOuvert.set(false);
    const el = this.doc.getElementById(anchor);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  setFiltre(langue: string): void {
    this.filtreExamen.set(langue);
  }

  choisirLangue(nom: string): void {
    this.interet.set(nom);
    this.scrollTo('contact');
  }

  choisirVacances(): void {
    this.interet.set('Cours de vacances');
    this.scrollTo('contact');
  }

  // ===== Soumission du formulaire (EmailJS) =====
  async soumettre(): Promise<void> {
    if (!this.formulaireValide() || this.envoiEnCours()) return;

    const { serviceId, templateId, publicKey } = environment.emailjs;
    if (
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId.startsWith('YOUR_') ||
      templateId.startsWith('YOUR_') ||
      publicKey.startsWith('YOUR_')
    ) {
      this.erreurEnvoi.set(
        'EmailJS n’est pas encore configuré. Contactez-nous via WhatsApp en attendant.',
      );
      return;
    }

    this.envoiEnCours.set(true);
    this.erreurEnvoi.set('');

    try {
      const nom = this.nom().trim();
      const email = this.email().trim();
      const telephone = this.telephone().trim() || 'Non renseigné';
      const interet = this.interet().trim();
      const message = this.message().trim();
      const sujet = `${nom} — Inscription / demande — ${interet}`;

      await emailjs.send(
        serviceId,
        templateId,
        {
          // Nom du visiteur (obligatoire pour le template + From Name EmailJS)
          name: nom,
          nom,
          from_name: nom,
          user_name: nom,
          email,
          from_email: email,
          user_email: email,
          telephone,
          interet,
          cours: interet,
          service: interet,
          topic: interet,
          subject: sujet,
          title: sujet,
          time: new Date().toLocaleString('fr-FR', {
            dateStyle: 'full',
            timeStyle: 'short',
          }),
          message,
          reply_to: email,
        },
        { publicKey },
      );
      this.envoye.set(true);
    } catch (err) {
      console.error('EmailJS error', err);
      this.erreurEnvoi.set(
        'L’envoi a échoué. Réessayez ou contactez-nous via WhatsApp au 696 649 878.',
      );
    } finally {
      this.envoiEnCours.set(false);
    }
  }

  nouveauMessage(): void {
    this.envoye.set(false);
    this.erreurEnvoi.set('');
    this.nom.set('');
    this.email.set('');
    this.telephone.set('');
    this.interet.set('');
    this.message.set('');
  }

  // Lien WhatsApp (Orange : 696 649 878)
  get lienWhatsapp(): string {
    const numero = '237696649878';
    const texte = encodeURIComponent(
      'Bonjour MAG LINGUA INSTITUT, je souhaite avoir des informations sur vos formations.',
    );
    return `https://wa.me/${numero}?text=${texte}`;
  }
}
