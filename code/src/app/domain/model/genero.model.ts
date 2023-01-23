import { MangaModel } from "./manga.model";

export interface GeneroModel {
    id: number;
    name: string;
    slug: string;
    dt_criacao: Date;
    mangas?: MangaModel[];
}