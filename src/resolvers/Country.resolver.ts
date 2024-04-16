import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import Country, { CreateCountryInput } from '../entities/Country.entity'
import CountryService from '../services/Country.service';

@Resolver()
export default class CountryResolver {
    @Query(() => [Country])
    async countries() {
        return await new CountryService().getAllCountries();
    }

    @Query(() => [Country])
    async  getCountryByCode(@Arg('code') code: string) {
        return await new CountryService().getCountryByCode(code)
    }
    
    @Query(() => [Country])
	async getCountryByContinent(@Arg('country') continent: string) {
        return await new CountryService().getCountryByContinent(continent);
	}
    
    @Mutation(() => Country)
    async insertCountry(@Arg('country') country: CreateCountryInput) {
        return await new CountryService().insertCountry(country);
    }
}