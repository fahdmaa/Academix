# Guide d'Administration OUIIPROF

## Problème de Persistance des Données

Les données sont stockées localement dans le navigateur (localStorage). Cela signifie que:
- Les soumissions faites sur votre site local ne sont pas visibles sur Vercel
- Les soumissions faites sur Vercel ne sont pas visibles localement
- Chaque environnement a son propre stockage isolé

## Solution: Import depuis les Emails

Chaque soumission génère un email contenant toutes les données dans le champ `submission_data`.

### Comment importer des soumissions:

1. **Ouvrez l'email de soumission** reçu sur fahd.maatoug9@gmail.com
2. **Trouvez le champ `submission_data`** dans l'email (c'est un bloc JSON)
3. **Copiez tout le JSON** (incluant les accolades `{}`)
4. **Dans le panneau admin**, cliquez sur le bouton "Importer"
5. **Collez le JSON** dans la zone de texte
6. **Cliquez sur "Importer"**

### Exemple de JSON à copier:
```json
{
  "fullName": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "0123456789",
  "city": "Paris",
  "method": "En ligne",
  "hours": "5",
  "subjects": "Mathématiques, Physique/Chimie",
  "timestamp": "2025-01-28T10:30:00.000Z",
  "source": "ouiiprof.vercel.app"
}
```

## Solutions à Long Terme

Pour une solution permanente, considérez:
1. **Base de données cloud** (Firebase, Supabase, etc.)
2. **Google Sheets API** pour stocker les soumissions
3. **Webhook** vers un service de stockage cloud

## Accès Admin

- URL: `/admin.html`
- Identifiant: `admin`
- Mot de passe: `admin123`
- Session expire après 30 minutes d'inactivité