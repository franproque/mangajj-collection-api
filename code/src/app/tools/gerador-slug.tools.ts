export class GeradorSlugTools {
geradorSlug(texto: string): string {
    return texto
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  
}
}