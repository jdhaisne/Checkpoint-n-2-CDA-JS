import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Country, { CreateCountryInput } from '../entities/Country.entity';



export default class CountryService {
	db: Repository<Country>;
	constructor() {
		this.db = datasource.getRepository(Country);
	}

	async getAllCountries() {
		return this.db.find();
	}

    async insertCountry(country: CreateCountryInput) {
		return this.db.insert(country);
	}

	
	async deleteCountry(id: number) {
		return this.db.delete(id);
	}
	
	async deleteCountries(ids: number[]) {
		return this.db.delete(ids);
	}

	async getCountryByCode(code: string) {
		return this.db.find({ where: { code: code } });
	}

	async getCountryByContinent(continent: string) {
		return this.db.find({ where: { continent: continent } });
	}
}