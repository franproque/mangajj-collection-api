import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import Positions from './positions'
import Collection from './collection'

@Entity()
export default class User {
  @PrimaryColumn('varchar', { name: 'email' })
  email: string

  @Column('varchar', { name: 'senha', nullable: false })
  senha: string

  @CreateDateColumn({ name: 'dt_criacao' })
  dt_criacao: Date

  @UpdateDateColumn({ name: 'dt_atualizacao' })
  dt_atualizacao: Date

  @ManyToOne(type => Positions, positions => positions.users)
  @JoinColumn({ name: 'position_id' })
  position?: Positions

  @OneToMany(type => Collection, collection => collection.user)
  collections?: Collection[]
}
