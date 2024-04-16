export class AiTemplateService {
  static getEssayAssessmentQuestion(props: { kind: string, title: string, content: string }) {
    return `
    Olá, estou preparando uma redação para o ${props.kind} com o tema "${props.title}". Preciso de sua assistência para aprimorar este texto em termos de estrutura, gramática e coesão. Solicito um feedback detalhado que identifique e pontue todos os erros presentes, fornecendo a localização exata e a natureza de cada erro dentro do texto. Por favor, ofereça sugestões práticas e específicas de melhoria para cada erro identificado.
  
    Além disso, com base nos critérios específicos do ${props.kind}, avalie minha redação de forma criteriosa e atribua uma pontuação conforme as normas estabelecidas, explicando detalhadamente os motivos para cada pontuação em cada critério.

    Gostaria que todos os erros fossem apontados, descrevendo exatamente as frases/palavras que errei no texto, deixe muito descritivo. Sempre que for corrigir algo na redação, sempre aponte qual frase/palavra/paragrafo que está errado
  
    Eu gostaria que a resposta gerado fosse apenas um json, com o seguinte formato: {
      "essay_assessment": {
        "competences": [
          {
            "name": "",
            "score_achieved": 150,
            "possible_score": 200,
            "suggestions": [
              {
                "kind": "error",
                "reference": "mostrar em qual parte do texto errou",
                "reason": "explicar o motivo de estar errado",
                "tip": "Dicas do que poderia substituir o errado, a dica deve ser direta com uma opção prática"
              },
              {
                "kind": "tip",
                "reference": "mostrar em qual parte do texto poderia ser melhorado",
                "reason": "explicar o motivo de estar mediano",
                "tip": "Dicas do que poderia substituir, a dica deve ser direta com uma opção prática"
              }
            ]
          }
        ],
        "total_score": 1000
      }
    }
  
    Aqui está o meu texto:
  
    ${props.content}
  `
  }

  static getEnhanceWritingResourceQuestion(props: { theme: string, thesis: string, amount: number }) {
    return `
    Estou escrevendo uma redação sobre o tema "${props.theme}" ${props.thesis ? `onde minha tese é ${props.thesis}` : ""}. Para enriquecer meu repertório na redação, preciso de ${props.amount} referências específicas. Poderia me fornecer, com base nesse tema, uma lista de referências históricas, falas de filmes, contextos de filmes, trechos de livros e citações?
    Eu gostaria que a resposta gerado fosse apenas um json, com o seguinte formato:
    {
      kind: 'quote' | 'movie' | 'book' | 'historical_fact',
      title: string,
      value: string
    }[]
    `
  }

  static getAdjustExtractedTextQuestion(props: {content: string}) {
    return `
    Olá, ChatGPT! Eu usei um sistema de OCR para extrair o texto de uma redação escrita por um aluno, mas o sistema retornou algumas partes do texto que parecem estranhas ou incorretas devido a erros de reconhecimento.
    Poderia me ajudar a corrigir apenas os erros gerados pelo OCR, mas mantendo quaisquer erros originais feitos pelo estudante?
    
    Gostaria que a resposta fosse apenas o texto corrigido, sem nenhum comentário adicional ou explicação. Muito obrigado pela ajuda!
    
    Aqui está o texto:
    ${props.content}
    `
  }
}