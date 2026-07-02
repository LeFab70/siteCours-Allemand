# Mag Lingua Institut — Site vitrine

Site vitrine interactif pour **Mag Lingua Institut** (Formation Professionnelle · Langues & Informatique),
basé sur le flyer officiel de l'institut.

## Stack technique

- **Angular 18** (composants standalone + **Signals** pour tout l'état réactif : menu mobile, scroll,
  cartes de langues, formulaire de contact)
- **Tailwind CSS** pour le design (couleurs reprises du flyer : bleu marine, orange, teal)
- **Animations CSS** : fade-in au scroll (IntersectionObserver via une directive `appReveal`),
  flip-cards pour les langues, dégradé animé du hero, flottement des drapeaux, spinner de soumission,
  toast de succès du formulaire.

## Sections du site

1. **Hero** — logo, slogan "Apprenez, progressez, ouvrez vos horizons !", localisation Yassa
2. **Cours de langues** — Français, Anglais, Italien, Chinois, Allemand, Espagnol (cartes flip)
3. **Préparation aux examens** — TCF, TELC, GOETHE, IELTS, TOEFL, CILS, PLIDA
4. **Procédure voyage & assistance visa** — les 4 étapes d'accompagnement
5. **Tarifs** — Frais d'inscription 15 000 FCFA, début d'inscription 15 juillet
6. **Contact** — coordonnées (téléphone, email, site, Facebook, adresse) + formulaire interactif
   avec validation en temps réel via signals

## Démarrage local

```bash
npm install
npm start
```

Le site sera disponible sur `http://localhost:4200`.

## Build de production

```bash
npm run build
```

Les fichiers seront générés dans `dist/mag-lingua-institut`.

## Publier sur GitHub

Depuis la racine du projet :

```bash
git init
git add .
git commit -m "Initial commit: site vitrine Mag Lingua Institut (Angular + Signals + Tailwind)"
git branch -M main
git remote add origin https://github.com/LeFab70/siteCours-Allemand.git
git push -u origin main
```

> Si le dépôt distant contient déjà des fichiers (README, licence...), faites d'abord :
> `git pull origin main --allow-unrelated-histories` avant le `push`.

## Personnalisation

- Coordonnées et prix : `src/app/components/contact/contact.component.ts` et
  `src/app/components/pricing/pricing.component.ts`
- Couleurs de marque : `tailwind.config.js`
- Le formulaire de contact simule actuellement l'envoi (`setTimeout`). Pour un envoi réel,
  branchez un service comme **EmailJS**, **Formspree**, ou une API backend dans
  `ContactComponent.onSubmit()`.
