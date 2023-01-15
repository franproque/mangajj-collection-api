import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Manga from './manga'
import User from './user'
import CollectionVolumes from './collection-volumes'

@Entity()
export default class Collection {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @ManyToOne(type => Manga, manga => manga.collections)
  @JoinColumn({ name: 'manga_id' })
  manga: Manga

  @ManyToOne(type => User, user => user.collections)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn({ name: 'dt_criacao' })
  dt_criacao: Date

  @OneToMany(type => CollectionVolumes, collectionVolumes => collectionVolumes.collection)
  volumes: CollectionVolumes[]
}
