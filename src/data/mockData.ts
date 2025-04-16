export interface Avis {
  id: number;
  nom: string;
  date: string;
  note: number;
  commentaire: string;
  avatar: string;
}

export interface Disponibilite {
  jour: string;
  creneaux: string[];
}

export interface Professionnel {
  id: number;
  nom: string;
  metier: string;
  ville: string;
  codePostal: string;
  adresse: string;
  telephone: string;
  email: string;
  description: string;
  logo: string;
  photos: string[];
  disponibilites: Disponibilite[];
  avis: Avis[];
  noteGlobale: number;
  tarifHoraire: number;
  specialites: string[];
}

export const professionnels: Professionnel[] = [
  {
    id: 1,
    nom: "Martin Électricité",
    metier: "Électricien",
    ville: "Paris",
    codePostal: "75001",
    adresse: "15 rue des Électriciens, 75001 Paris",
    telephone: "01 23 45 67 89",
    email: "contact@martinelectricite.fr",
    description: "Électricien professionnel avec plus de 15 ans d'expérience. Spécialisé dans les installations électriques résidentielles et commerciales. Interventions rapides et travail de qualité garanti.",
    logo: "https://picsum.photos/id/1/200/200",
    photos: [
      "https://picsum.photos/id/20/800/600",
      "https://picsum.photos/id/21/800/600",
      "https://picsum.photos/id/22/800/600"
    ],
    disponibilites: [
      { jour: "Lundi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] },
      { jour: "Mardi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] },
      { jour: "Mercredi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] },
      { jour: "Jeudi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] },
      { jour: "Vendredi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] }
    ],
    avis: [
      {
        id: 1,
        nom: "Sophie Dubois",
        date: "15/03/2025",
        note: 5,
        commentaire: "Excellent travail, rapide et efficace. Je recommande !",
        avatar: "https://picsum.photos/id/64/100/100"
      },
      {
        id: 2,
        nom: "Pierre Lenoir",
        date: "05/03/2025",
        note: 4,
        commentaire: "Intervention rapide et professionnelle. Prix correct.",
        avatar: "https://picsum.photos/id/65/100/100"
      }
    ],
    noteGlobale: 4.5,
    tarifHoraire: 60,
    specialites: ["Installation électrique", "Dépannage", "Mise aux normes"]
  },
  {
    id: 2,
    nom: "Dupont Plomberie",
    metier: "Plombier",
    ville: "Lyon",
    codePostal: "69002",
    adresse: "23 avenue des Plombiers, 69002 Lyon",
    telephone: "04 78 12 34 56",
    email: "contact@dupontplomberie.fr",
    description: "Plombier certifié avec plus de 20 ans d'expérience dans le secteur. Spécialisé dans les installations sanitaires, réparations et dépannages urgents.",
    logo: "https://picsum.photos/id/2/200/200",
    photos: [
      "https://picsum.photos/id/23/800/600",
      "https://picsum.photos/id/24/800/600",
      "https://picsum.photos/id/25/800/600"
    ],
    disponibilites: [
      { jour: "Lundi", creneaux: ["08:30 - 12:30", "13:30 - 17:30"] },
      { jour: "Mardi", creneaux: ["08:30 - 12:30", "13:30 - 17:30"] },
      { jour: "Mercredi", creneaux: ["08:30 - 12:30", "13:30 - 17:30"] },
      { jour: "Jeudi", creneaux: ["08:30 - 12:30", "13:30 - 17:30"] },
      { jour: "Vendredi", creneaux: ["08:30 - 12:30", "13:30 - 17:30"] },
      { jour: "Samedi", creneaux: ["09:00 - 12:00"] }
    ],
    avis: [
      {
        id: 1,
        nom: "Marie Martin",
        date: "20/03/2025",
        note: 5,
        commentaire: "Service impeccable, ponctuel et très professionnel.",
        avatar: "https://picsum.photos/id/66/100/100"
      },
      {
        id: 2,
        nom: "Jean Lefebvre",
        date: "10/03/2025",
        note: 5,
        commentaire: "Très satisfait de l'intervention. Travail propre et bien fait.",
        avatar: "https://picsum.photos/id/67/100/100"
      },
      {
        id: 3,
        nom: "Lucie Blanc",
        date: "01/03/2025",
        note: 4,
        commentaire: "Bon service et prix correct. Légèrement en retard sur l'horaire prévu.",
        avatar: "https://picsum.photos/id/68/100/100"
      }
    ],
    noteGlobale: 4.7,
    tarifHoraire: 65,
    specialites: ["Plomberie générale", "Dépannage urgent", "Installation sanitaire"]
  },
  {
    id: 3,
    nom: "Leroy Menuiserie",
    metier: "Menuisier",
    ville: "Marseille",
    codePostal: "13006",
    adresse: "8 rue des Artisans, 13006 Marseille",
    telephone: "04 91 23 45 67",
    email: "contact@leroymenuiserie.fr",
    description: "Menuisier artisanal proposant des créations sur mesure et des rénovations pour particuliers et professionnels. Travail de qualité réalisé avec passion.",
    logo: "https://picsum.photos/id/3/200/200",
    photos: [
      "https://picsum.photos/id/26/800/600",
      "https://picsum.photos/id/27/800/600",
      "https://picsum.photos/id/28/800/600"
    ],
    disponibilites: [
      { jour: "Lundi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] },
      { jour: "Mardi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] },
      { jour: "Mercredi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] },
      { jour: "Jeudi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] },
      { jour: "Vendredi", creneaux: ["09:00 - 12:00", "14:00 - 18:00"] }
    ],
    avis: [
      {
        id: 1,
        nom: "Philippe Martin",
        date: "25/03/2025",
        note: 5,
        commentaire: "Travail d'exception, précis et soigné. Je recommande vivement !",
        avatar: "https://picsum.photos/id/69/100/100"
      },
      {
        id: 2,
        nom: "Émilie Laurent",
        date: "18/03/2025",
        note: 5,
        commentaire: "Réalisation parfaite de notre cuisine sur mesure. Délais respectés.",
        avatar: "https://picsum.photos/id/70/100/100"
      }
    ],
    noteGlobale: 5.0,
    tarifHoraire: 70,
    specialites: ["Menuiserie sur mesure", "Rénovation", "Agencement intérieur"]
  },
  {
    id: 4,
    nom: "Garcia Peinture",
    metier: "Peintre",
    ville: "Toulouse",
    codePostal: "31000",
    adresse: "12 boulevard des Peintres, 31000 Toulouse",
    telephone: "05 61 34 56 78",
    email: "contact@garciapeinture.fr",
    description: "Entreprise de peinture proposant des services complets de décoration intérieure et extérieure. Spécialiste en revêtements muraux et peintures écologiques.",
    logo: "https://picsum.photos/id/4/200/200",
    photos: [
      "https://picsum.photos/id/29/800/600",
      "https://picsum.photos/id/30/800/600",
      "https://picsum.photos/id/31/800/600"
    ],
    disponibilites: [
      { jour: "Lundi", creneaux: ["08:00 - 12:00", "13:00 - 17:00"] },
      { jour: "Mardi", creneaux: ["08:00 - 12:00", "13:00 - 17:00"] },
      { jour: "Mercredi", creneaux: ["08:00 - 12:00", "13:00 - 17:00"] },
      { jour: "Jeudi", creneaux: ["08:00 - 12:00", "13:00 - 17:00"] },
      { jour: "Vendredi", creneaux: ["08:00 - 12:00", "13:00 - 17:00"] }
    ],
    avis: [
      {
        id: 1,
        nom: "Antoine Dupont",
        date: "30/03/2025",
        note: 4,
        commentaire: "Bon travail, rendu propre et soigné. Délais légèrement dépassés.",
        avatar: "https://picsum.photos/id/71/100/100"
      },
      {
        id: 2,
        nom: "Caroline Mercier",
        date: "22/03/2025",
        note: 5,
        commentaire: "Excellent travail, équipe sérieuse et professionnelle.",
        avatar: "https://picsum.photos/id/72/100/100"
      }
    ],
    noteGlobale: 4.5,
    tarifHoraire: 55,
    specialites: ["Peinture intérieure", "Peinture extérieure", "Revêtements décoratifs"]
  },
  {
    id: 5,
    nom: "Bernard Jardinage",
    metier: "Jardinier",
    ville: "Nantes",
    codePostal: "44000",
    adresse: "45 rue des Jardins, 44000 Nantes",
    telephone: "02 40 12 34 56",
    email: "contact@bernardjardinage.fr",
    description: "Jardinier paysagiste proposant des services d'entretien et d'aménagement de jardins. Conseils personnalisés et solutions écologiques pour tous vos espaces verts.",
    logo: "https://picsum.photos/id/5/200/200",
    photos: [
      "https://picsum.photos/id/32/800/600",
      "https://picsum.photos/id/33/800/600",
      "https://picsum.photos/id/34/800/600"
    ],
    disponibilites: [
      { jour: "Lundi", creneaux: ["08:30 - 12:30", "14:00 - 18:00"] },
      { jour: "Mardi", creneaux: ["08:30 - 12:30", "14:00 - 18:00"] },
      { jour: "Mercredi", creneaux: ["08:30 - 12:30", "14:00 - 18:00"] },
      { jour: "Jeudi", creneaux: ["08:30 - 12:30", "14:00 - 18:00"] },
      { jour: "Vendredi", creneaux: ["08:30 - 12:30", "14:00 - 18:00"] }
    ],
    avis: [
      {
        id: 1,
        nom: "Sylvie Moreau",
        date: "02/04/2025",
        note: 5,
        commentaire: "Service impeccable, jardin transformé et magnifique !",
        avatar: "https://picsum.photos/id/73/100/100"
      },
      {
        id: 2,
        nom: "Thomas Petit",
        date: "25/03/2025",
        note: 4,
        commentaire: "Bon travail d'entretien régulier. Équipe sérieuse.",
        avatar: "https://picsum.photos/id/74/100/100"
      }
    ],
    noteGlobale: 4.5,
    tarifHoraire: 45,
    specialites: ["Entretien de jardins", "Aménagement paysager", "Taille et élagage"]
  }
];

export const villes = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Nantes", 
  "Bordeaux", "Lille", "Strasbourg", "Nice", "Rennes"
];

export const metiers = [
  "Électricien", "Plombier", "Menuisier", "Peintre", "Jardinier",
  "Carreleur", "Maçon", "Serrurier", "Couvreur", "Chauffagiste"
];
