import { Component, computed, signal, OnInit, OnDestroy, inject, DOCUMENT } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from './reveal.directive';
import { Chatbot } from './chatbot/chatbot';
import {
  LANGUES,
  EXAMENS,
  SERVICES_VISA,
  INFO_CONTACT,
  FRAIS_INSCRIPTION,
  DEBUT_INSCRIPTION,
  AVIS,
} from './data/institut.data';

interface Compteur {
  jours: number;
  heures: number;
  minutes: number;
  secondes: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RevealDirective, Chatbot],
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

  // Note moyenne des avis clients
  readonly noteMoyenne = computed(() => {
    const total = this.avis.reduce((s, a) => s + a.note, 0);
    return Math.round((total / this.avis.length) * 10) / 10;
  });

  // Largeur (%) de remplissage des étoiles pour une note /5
  largeurEtoiles(note: number): number {
    return (note / 5) * 100;
  }

  readonly navLinks = [
    { label: 'Accueil', anchor: 'accueil' },
    { label: 'Langues', anchor: 'langues' },
    { label: 'Examens', anchor: 'examens' },
    { label: 'Visa', anchor: 'visa' },
    { label: 'Avis', anchor: 'avis' },
    { label: 'Contact', anchor: 'contact' },
  ];

  // ===== État de l'interface (signaux) =====
  readonly menuOuvert = signal(false);
  readonly pageDefilee = signal(false);
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

  readonly nomValide = computed(() => this.nom().trim().length >= 2);
  readonly emailValide = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()));
  readonly messageValide = computed(() => this.message().trim().length >= 10);
  readonly formulaireValide = computed(
    () => this.nomValide() && this.emailValide() && this.messageValide(),
  );

  ngOnInit(): void {
    this.majCompteur();
    this.timer = setInterval(() => this.majCompteur(), 1000);
    this.doc.defaultView?.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.doc.defaultView?.removeEventListener('scroll', this.onScroll);
  }

  private onScroll = () => {
    const y = this.doc.defaultView?.scrollY ?? 0;
    this.pageDefilee.set(y > 40);
  };

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

  // ===== Soumission du formulaire =====
  soumettre(): void {
    if (!this.formulaireValide() || this.envoiEnCours()) return;
    this.envoiEnCours.set(true);
    // Simulation d'envoi (aucun backend)
    setTimeout(() => {
      this.envoiEnCours.set(false);
      this.envoye.set(true);
    }, 1400);
  }

  nouveauMessage(): void {
    this.envoye.set(false);
    this.nom.set('');
    this.email.set('');
    this.telephone.set('');
    this.interet.set('');
    this.message.set('');
  }

  // Lien WhatsApp pré-rempli à partir du 1er numéro
  get lienWhatsapp(): string {
    const numero = '237' + this.info.telephones[0].replace(/\s/g, '');
    const texte = encodeURIComponent(
      'Bonjour MAG LINGUA INSTITUT, je souhaite avoir des informations sur vos formations.',
    );
    return `https://wa.me/${numero}?text=${texte}`;
  }
}
