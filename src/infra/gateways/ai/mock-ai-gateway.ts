import { AiGateway } from "@/domain/essay/application/gateways/ai-gateway";
import { ResourceReferenceProps } from "@/domain/essay/enterprise/entities/resource-reference";

export class MockAiGateway implements AiGateway {
  async adjustExtractedText(question: string): Promise<{ content: string; }> {
    return { content: "Adjusted text" }
  }

  enhanceWritingResources(question: string): Promise<{ references: ResourceReferenceProps[]; }> {
    return {
      references: [
        {
          kind: 'historical_fact',
          title: 'Ada Lovelace',
          value: 'Considerada a primeira programadora da história, Ada Lovelace escreveu o primeiro algoritmo destinado a ser processado por uma máquina no século XIX.'
        },
        {
          kind: 'book',
          title: 'Lean In: Women, Work, and the Will to Lead',
          value: 'Escrito por Sheryl Sandberg, COO do Facebook, o livro discute os desafios que as mulheres enfrentam no local de trabalho e como superá-los.'
        },
        {
          kind: 'movie',
          title: 'Estrelas Além do Tempo',
          value: 'Baseado em uma história real, o filme destaca o papel fundamental de três mulheres afro-americanas na NASA durante a corrida espacial.'
        },
        {
          kind: 'quote',
          title: 'Grace Hopper',
          value: '"O mais difícil de qualquer problema é encontrar a resposta certa. Porém, o mais complicado é fazer as perguntas corretas."'
        },
        {
          kind: 'historical_fact',
          title: 'Susan Wojcicki',
          value: 'CEO do YouTube desde 2014, Wojcicki é uma das primeiras funcionárias do Google, contribuindo expressivamente para a expansão e sucesso da empresa na internet.'
        }
      ]
    } as any
  }

  async evaluateEssay(question: string) {
    return {
      essay_assessment: { "competences": [{ "name": "Demonstrar domínio da modalidade escrita formal da língua portuguesa", "score_achieved": 180, "possible_score": 200, "suggestions": [{ "kind": "tip", "reference": "nao se aplica aqui, visto a alta qualidade da escrita.", "reason": "A redação apresenta um ótimo uso da norma culta, com pouquíssimos deslizes.", "tip": "Manter o uso adequado de conectivos e a construção clara das frases." }] }, { "name": "Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema, dentro dos limites estruturais do texto dissertativo-argumentativo em prosa", "score_achieved": 160, "possible_score": 200, "suggestions": [{ "kind": "tip", "reference": "Uso de citações", "reason": "Embora eficazes, as citações podem ser melhor contextualizadas para fortalecer os argumentos.", "tip": "Buscar integrar as citações de maneira mais orgânica ao desenvolvimento dos argumentos, estabelecendo uma conexão direta com o tema proposto." }] }, { "name": "Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista", "score_achieved": 150, "possible_score": 200, "suggestions": [{ "kind": "error", "reference": "Estruturação dos parágrafos argumentativos", "reason": "Alguns argumentos poderiam ser mais desenvolvidos para uma clara defesa da tese.", "tip": "Inserir exemplos concretos ou dados estatísticos que corroborem os argumentos apresentados, fortalecendo a defesa da tese." }] }, { "name": "Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação", "score_achieved": 160, "possible_score": 200, "suggestions": [{ "kind": "tip", "reference": "Uso de conectivos", "reason": "Embora haja uma boa conexão entre os parágrafos, os conectivos podem ser diversificados para enriquecer o texto.", "tip": "Explorar uma variedade maior de conectivos para evitar repetições e tornar o texto mais fluído." }] }, { "name": "Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos", "score_achieved": 170, "possible_score": 200, "suggestions": [{ "kind": "tip", "reference": "Proposta de intervenção", "reason": "A proposta de intervenção é relevante, porém poderia ser mais detalhada.", "tip": "Detalhar as etapas de implementação das propostas de intervenção e como elas se conectam aos problemas identificados." }] }], "total_score": 820 }
    } as any
  }
}