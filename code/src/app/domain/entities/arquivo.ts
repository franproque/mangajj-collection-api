import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class Arquivo {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number

  @Column('varchar', { name: 'mime_type', nullable: false })
  mimetype: string

  @Column('varchar', { name: 'nome_original', nullable: false })
  nomeoriginal: string

  @Column('integer', { name: 'tamanho', nullable: false })
  tamanho: number

  @Column('varchar', { name: 'nome', nullable: false })
  nome: string

  @Column('varchar', { name: 'path', nullable: false })
  path: string

  @Column('timestamp', { name: 'mtime', nullable: false })
  mtime: Date

  @CreateDateColumn({ name: 'dt_criacao' })
  dt_criacao: Date

  @UpdateDateColumn({ name: 'dt_atualizacao' })
  dt_atualizacao: Date
}
