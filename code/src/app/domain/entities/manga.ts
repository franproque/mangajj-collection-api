import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Collection from './collection'
import Genero from './genero'

@Entity()
export default class Manga {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('varchar', { name: 'title', nullable: false })
  title: string

  @Column('varchar', { name: 'description', default: '' })
  description: string

  @Column('varchar', { name: 'image', nullable: false })
  image: string

  @Column('integer', { name: 'volumes', nullable: true })
  volumes: number

  @Column('varchar', { name: 'id_externo', nullable: false })
  idExterno: string

  @Column('varchar', { name: 'status', nullable: false })
  status: string

  @OneToMany(type => Collection, collection => collection.manga)
  collections?: Collection[]


  @ManyToMany(type => Genero, genero => genero.mangas)
  @JoinTable({ name: 'manga_genero'})
  generos?:Genero[]
}
