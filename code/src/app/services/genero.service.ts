import { GeneroModel } from "../domain/model/genero.model";
import { FindProps } from "../infra/interfaces/find-props.interface";
import { GeneroRepository } from "../infra/repositories/genero-repository";
import { GeradorSlugTools } from "../tools/gerador-slug.tools";

export class GeneroService {
    private readonly generoRepository: GeneroRepository;
    private readonly geradorSlug: GeradorSlugTools;
    constructor() {
        this.geradorSlug = new GeradorSlugTools();
        this.generoRepository = new GeneroRepository();
    }

    async find(props: FindProps): Promise<GeneroModel[]> {
        return await this.generoRepository.find(props);
    }

    async findOne(props: FindProps): Promise<GeneroModel | null> {
        const genero = await this.generoRepository.find(props);
        return genero[0] ?? null;
    }

    async addGenero(genero: AddGeneroModel): Promise<GeneroModel> {
        return await this.generoRepository.add(genero);
    }

    async processAddGenero(genero: AddGeneroModel): Promise<GeneroModel> {
        const slug = this.geradorSlug.geradorSlug(genero.name);
        genero.slug = slug;
        console.log(genero);

        const generoResult = await this.findOne({
            where:{
                slug: genero.slug
            }
        })
        if(generoResult === null){
            return await this.addGenero(genero);
        }
        return generoResult;
    }
}

export interface AddGeneroModel {
    name: string;
    slug?: string;
}