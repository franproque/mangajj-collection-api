import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Collection from './collection'

export default class Manga {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('varchar', { name: 'title', nullable: false })
  title: string

  @Column('varchar', { name: 'description', default: '' })
  description: string

  @Column('varchar', { name: 'image', nullable: false })
  image: string

  @Column('varchar', { name: 'author', nullable: false })
  volumes: number

  @Column('varchar', { name: 'author', nullable: false })
  idExterno: string

  @OneToMany(type => Collection, collection => collection.manga)
  collections?: Collection[]
}
