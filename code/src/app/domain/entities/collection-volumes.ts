import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Collection from './collection'

@Entity()
export default class CollectionVolumes {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @ManyToOne(type => Collection, collection => collection.volumes)
  @JoinColumn({ name: 'collection_id' })
  collection?: Collection

  @Column('integer', { name: 'volume', nullable: false })
  volumeNumero: number

  @CreateDateColumn({ name: 'dt_criacao' })
  dt_criacao: Date
}
