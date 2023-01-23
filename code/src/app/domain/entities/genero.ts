import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Manga from "./manga";
@Entity()
export default class Genero {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @Column('varchar', { name: 'slug', nullable: false, unique: true   })
    slug: string;

    @CreateDateColumn({ name: 'dt_criacao' })
    dt_criacao: Date;

    @ManyToMany(type => Manga, manga => manga.generos)
    mangas?: Manga[];
}