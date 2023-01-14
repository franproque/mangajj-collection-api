import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import Permissions from './permissions'
import User from './user'

@Entity()
export default class Positions {
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

  @OneToMany(type => User, user => user.position)
  users?: User[]

  @ManyToMany(type => Permissions, permissions => permissions.positions)
  @JoinTable()
  permissions?: Permissions
}
