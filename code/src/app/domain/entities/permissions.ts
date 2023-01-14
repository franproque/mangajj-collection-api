import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import Positions from './positions'

@Entity()
export default class Permissions {
  @PrimaryColumn('varchar', { name: 'slug' })
  slug: string

  @Column('varchar', { name: 'name' })
  name: string

  @Column('varchar', { name: 'description' })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  created_at: string

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string

  @ManyToMany(type => Positions, positions => positions.permissions)
  positions?: Positions[]
}
