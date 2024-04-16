import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Field, ID, InputType,  ObjectType } from 'type-graphql';

@ObjectType()
export default class Country {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  emoji: string;

}

@InputType()
export class CreateCountryInput {
	@Field({nullable: true})
	name: string
	@Field({nullable: true})
	code: string
	@Field({nullable: true})
	emoji: string
}