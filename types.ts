
export enum Screen {
  Welcome = 'WELCOME',
  PortalSelection = 'PORTAL_SELECTION',
  ExperimentList = 'EXPERIMENT_LIST',
  ExperimentDetail = 'EXPERIMENT_DETAIL'
}

export enum Category {
  Biology = 'الأحياء',
  Physics = 'الفيزياء',
  Chemistry = 'الكيمياء',
  General = 'علوم عامة',
  Electricity = 'الكهرباء',
  Mechanics = 'الميكانيكا'
}

export interface Experiment {
  id: string;
  portalId: string; // To link with Year 3 or Year 4
  title: string;
  category: Category;
  unit: string;
  difficulty: 'سهل' | 'متوسط' | 'متقدم';
  duration: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  materials: Material[];
  steps: string[];
  safetyWarning?: string;
}

export interface Material {
  id: string;
  name: string;
  icon: string;
}

export interface Portal {
  id: string;
  name: string;
  description: string;
  tag: string;
  imageUrl: string;
  experimentsCount: number;
}
