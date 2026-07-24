# Orionis Solutions — Site vitrine

Landing page statique d'[Orionis Solutions](https://orionis-solutions.fr), éditeur indépendant de logiciels : **Factilo** (facturation électronique conforme réforme 2026), **SécuCitoyen** et **DFCI OPS**.

## Structure

```
index.html                      Landing page
mentions-legales.html           Mentions légales (LCEN)
politique-confidentialite.html  Politique de confidentialité (RGPD)
style.css                       Styles (thème sombre par défaut + mode clair)
main.js                         Ciel étoilé, bascule de thème, menu mobile, bouton remonter
fonts/                          Polices auto-hébergées (Inter, Space Grotesk, JetBrains Mono)
images/                         Logo, bannières, og-image
```

## Caractéristiques

- 100 % statique, zéro dépendance, zéro cookie, aucun appel à un service tiers (polices auto-hébergées)
- Mode clair / sombre avec mémorisation (`localStorage`), sombre par défaut
- Accessible : navigation clavier, `aria-*`, contrastes AA, respect de `prefers-reduced-motion`
- SEO / partage : Open Graph + Twitter Card avec image 1200×630, canonical

## Développement

Aucun build : ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
npx serve .
```

## À compléter avant mise en ligne

- [x] Domaine : `orionis-solutions.fr` (balises `canonical` / `og:url` / `og:image` déjà alignées)
- [ ] Placeholders surlignés des pages légales : SIREN/RCS et n° TVA (après immatriculation), coordonnées de l'hébergeur
