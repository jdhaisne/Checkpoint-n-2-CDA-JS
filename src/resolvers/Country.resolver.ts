import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import Country, { CreateCountryInput } from '../entities/Country.entitie'
import CountryService from '../services/Country.service';

@Resolver()
export default class CountryResolver {
    @Query(() => [Country])
    async countries() {
        return await new CountryService().getAllCountries();
    }
    @Mutation(() => Country)
	async insertCountry(@Arg('country') variable: CreateCountryInput) {
		return await new CountryService().insertCountry(variable);
	}
}