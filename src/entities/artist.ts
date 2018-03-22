import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Album } from './album'
import { Track } from './track'

@Entity()
export class Artist
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public hash: string

    @Column({ unique: true })
    public name: string

    @Column({ nullable: true })
    public coverArt: string

    @Column({ nullable: true })
    public marked: boolean

    // http://typeorm.io/#/many-to-many-relations

    @ManyToMany(type => Album, album => album.artists, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    @JoinTable()
    public albums: Album[]

    @ManyToMany(type => Track, track => track.artists, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    @JoinTable()
    public tracks: Track[]
}
