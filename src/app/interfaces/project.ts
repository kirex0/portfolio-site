export interface Project {
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  deployedUrl?: string;
  repoUrl?: string;
}
