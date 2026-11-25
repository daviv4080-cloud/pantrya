/* Pantrya — static AI recipe generator
 * The OpenAI key, if provided, is read only from localStorage.
 * This file never reads environment variables and never embeds a key.
 */
(() => {
  "use strict";

  const STORAGE = {
    key: "pantrya_api_key",
    demo: "pantrya_demo_mode",
    favs: "pantrya_favorites",
    lang: "pantrya_lang",
    theme: "pn-theme",
  };
  const LEGACY = {
    key: "pantrychef_api_key",
    demo: "pantrychef_demo_mode",
    favs: "pantrychef_favorites",
    lang: "pantrychef_lang",
  };

  const SUGGESTIONS = {
    pt: ["Tomate", "Cebola", "Alho", "Ovo", "Frango", "Macarrão", "Arroz", "Pimentão", "Batata", "Azeite", "Grão-de-bico", "Limão", "Espinafre", "Banana", "Aveia"],
    en: ["Tomato", "Onion", "Garlic", "Egg", "Chicken", "Pasta", "Rice", "Bell pepper", "Potato", "Olive oil", "Chickpeas", "Lemon", "Spinach", "Banana", "Oats"],
  };

  const I18N = {
    pt: {
      brandTag: "Receitas com IA",
      favorites: "Favoritos",
      navMain: "Principal",
      langGroup: "Idioma",
      removeNamed: "Remover {name}",
      favoritesCount: "Favoritos, {n}",
      settings: "Ajustes",
      themeToDark: "Ativar tema escuro",
      themeToLight: "Ativar tema claro",
      heroTitle: "Receitas completas a partir do que você já tem na geladeira.",
      heroLede: "Transforme o que está na geladeira em uma receita completa: o que você já tem, o que falta comprar, o passo a passo, dicas e uma estimativa nutricional.",
      ingredientsTitle: "O que você tem na geladeira?",
      ingredientsHelp: "Liste os ingredientes separados por vírgula.",
      demoOn: "Modo demonstração",
      liveOn: "OpenAI ao vivo",
      ingredientLabel: "Adicionar ingrediente",
      ingredientPlaceholder: "Ex.: ovo, tomate, arroz, cebola, azeite",
      add: "Adicionar",
      clear: "Limpar",
      chipsEmpty: "Nenhum ingrediente ainda. Use as sugestões abaixo ou digite o que você tem.",
      suggestions: "Sugestões",
      meal: "Tipo de refeição",
      time: "Tempo de preparo",
      diet: "Restrição alimentar",
      dietHelp: "A receita tenta respeitar a restrição com base nos ingredientes informados.",
      servings: "Porções",
      servingsMinus: "Diminuir porções",
      servingsPlus: "Aumentar porções",
      generate: "Gerar receita",
      generating: "Gerando receita…",
      footer: "Um projeto de portfólio de Davi Silva.",
      footerModel: "As receitas são geradas com OpenAI gpt-4o-mini, no seu navegador.",
      footerNutrition: "A nutrição exibida é uma estimativa gerada por IA, não orientação médica.",
      favoritesTitle: "Favoritos",
      favoritesHelp: "As receitas favoritas ficam no localStorage deste navegador. Elas não são enviadas a nenhum servidor e somem se você limpar os dados do site.",
      settingsTitle: "Ajustes",
      close: "Fechar",
      demoMode: "Modo demonstração",
      demoHelp: "No modo demonstração, o app mostra receitas de exemplo sem chamar a OpenAI e sem precisar de chave. Para gerar receitas com IA a partir dos seus ingredientes, adicione sua própria chave da OpenAI e desligue este modo.",
      apiKey: "Chave da OpenAI",
      apiKeyPlaceholder: "Cole sua chave",
      apiKeyHelp: "Usamos o modelo gpt-4o-mini. A chave não passa por nenhum servidor nosso.",
      getKey: "Obter uma chave na OpenAI",
      showKey: "Mostrar chave",
      hideKey: "Ocultar chave",
      keyNotice: "Sua chave da OpenAI fica apenas no localStorage deste navegador. As chamadas vão direto do seu computador para a API da OpenAI; este app não tem backend e não recebe nem armazena a chave em nenhum servidor. O uso é cobrado na sua conta da OpenAI. Não cole a chave em um computador compartilhado. Remova a chave quando terminar, principalmente em dispositivos que outras pessoas usam.",
      saveKey: "Salvar chave",
      clearKey: "Remover chave",
      saved: "Chave salva neste navegador.",
      settingsSaved: "Ajustes salvos.",
      keyRemoved: "Chave removida deste navegador.",
      needIngredient: "Adicione pelo menos um ingrediente para gerar a receita.",
      needKey: "Para gerar uma receita, adicione sua chave da OpenAI ou entre no modo demonstração.",
      invalidKey: "A chave da OpenAI foi recusada. Confira se ela está completa, ativa e com acesso à API.",
      networkError: "Sem conexão com a internet. Verifique a rede e tente de novo. A chamada à OpenAI é feita direto do seu navegador.",
      rateLimit: "A OpenAI limitou as solicitações desta chave no momento. Aguarde um pouco e tente de novo. Se o limite persistir, confira o uso e a cota na sua conta da OpenAI.",
      badResponse: "A OpenAI respondeu, mas o app não conseguiu ler a receita. Tente gerar de novo. Se o erro continuar, simplifique a lista de ingredientes.",
      timeout: "A solicitação demorou demais e foi interrompida. Tente de novo.",
      modelError: "Esta chave não pôde usar o modelo gpt-4o-mini. Confira as permissões e o acesso ao modelo na sua conta da OpenAI.",
      genericError: "Não foi possível gerar a receita. Tente de novo em instantes.",
      serverError: "O servidor da OpenAI falhou. Tente de novo em instantes.",
      onlyOneDemo: "Só há uma receita de exemplo para esses filtros.",
      closestDemo: "Na demonstração, esta é a receita de exemplo mais próxima dos filtros escolhidos.",
      recipeLangPt: "Receita gerada em português.",
      recipeLangEn: "Receita gerada em inglês.",
      readyAnnounce: "Receita pronta: {title}",
      nutritionTab: "Nutrição",
      stepsTab: "Preparo",
      ingredientLimit: "O nome pode ter no máximo 60 caracteres.",
      loading: "Montando sua receita…",
      loadingSub: "Isso pode levar alguns segundos.",
      loadingLive: "Gerando receita. Aguarde.",
      variation: "Gerar outra variação",
      newRecipe: "Nova receita",
      copy: "Copiar receita",
      copied: "Receita copiada",
      copyFail: "Não deu para copiar. Tente de novo.",
      saveFav: "Salvar nos favoritos",
      savedFavLabel: "Salva nos favoritos",
      savedFav: "Receita salva nos favoritos.",
      removedFav: "Receita removida dos favoritos.",
      removeFavAction: "Remover dos favoritos",
      removeFav: "Remover",
      favSaveFail: "Não foi possível salvar nos favoritos neste navegador.",
      favEmpty: "Nenhuma receita salva ainda. Quando encontrar uma que queira guardar, toque em “Salvar nos favoritos”. Elas ficam só neste navegador.",
      have: "Você já tem",
      need: "Falta comprar",
      haveIntro: "Com base no que você informou.",
      needEmpty: "Você já tem tudo o que esta receita pede.",
      ingredients: "Ingredientes",
      steps: "Modo de preparo",
      tips: "Dicas",
      nutrition: "Nutrição (estimativa)",
      nutritionDisclaimer: "Estimativa gerada por IA, com base nos ingredientes informados. Não é orientação nutricional ou médica e não substitui o acompanhamento de um profissional.",
      calories: "Calorias",
      protein: "Proteína",
      carbs: "Carboidratos",
      fat: "Gordura",
      timeLabel: "Tempo de preparo",
      servingsLabel: "Porções",
      difficulty: "Dificuldade",
      minutes: "min",
      demoNote: "Receita de exemplo do modo demonstração.",
      emptyResult: "Informe os ingredientes e toque em “Gerar receita”. A Pantrya monta o que você já tem, o que falta comprar, o modo de preparo, dicas e uma estimativa nutricional.",
      retry: "Tentar de novo",
      meals: [
        { value: "", label: "Qualquer" },
        { value: "breakfast", label: "Café da manhã" },
        { value: "lunch", label: "Almoço" },
        { value: "dinner", label: "Jantar" },
        { value: "snack", label: "Lanche" },
        { value: "dessert", label: "Sobremesa" },
      ],
      times: [
        { value: "", label: "Qualquer" },
        { value: "15", label: "Até 15 minutos" },
        { value: "30", label: "Até 30 minutos" },
        { value: "45", label: "Até 45 minutos" },
        { value: "60", label: "Até 1 hora" },
        { value: "90", label: "Mais de 1 hora" },
      ],
      diets: [
        { value: "", label: "Nenhuma" },
        { value: "vegetarian", label: "Vegetariano" },
        { value: "vegan", label: "Vegano" },
        { value: "gluten-free", label: "Sem glúten" },
        { value: "lactose-free", label: "Sem lactose" },
        { value: "seafood-free", label: "Sem frutos do mar" },
      ],
      mealNames: { breakfast: "Café da manhã", lunch: "Almoço", dinner: "Jantar", snack: "Lanche", dessert: "Sobremesa" },
    },
    en: {
      brandTag: "AI recipes",
      favorites: "Favorites",
      navMain: "Main",
      langGroup: "Language",
      removeNamed: "Remove {name}",
      favoritesCount: "Favorites, {n}",
      settings: "Settings",
      themeToDark: "Switch to dark theme",
      themeToLight: "Switch to light theme",
      heroTitle: "Complete recipes from what’s already in your fridge.",
      heroLede: "Turn what’s in your fridge into a full recipe: what you already have, what to buy, the method, tips, and a nutrition estimate.",
      ingredientsTitle: "What’s in your fridge?",
      ingredientsHelp: "List ingredients separated by commas.",
      demoOn: "Demo mode",
      liveOn: "Live OpenAI",
      ingredientLabel: "Add ingredient",
      ingredientPlaceholder: "E.g. egg, tomato, rice, onion, olive oil",
      add: "Add",
      clear: "Clear",
      chipsEmpty: "No ingredients yet. Use the suggestions below or type what you have.",
      suggestions: "Suggestions",
      meal: "Meal type",
      time: "Prep time",
      diet: "Dietary restriction",
      dietHelp: "The recipe tries to honor the restriction based on the ingredients you entered.",
      servings: "Servings",
      servingsMinus: "Decrease servings",
      servingsPlus: "Increase servings",
      generate: "Generate recipe",
      generating: "Generating recipe…",
      footer: "A portfolio project by Davi Silva.",
      footerModel: "Recipes are generated with OpenAI gpt-4o-mini, in your browser.",
      footerNutrition: "The nutrition shown is an AI estimate, not medical advice.",
      favoritesTitle: "Favorites",
      favoritesHelp: "Favorite recipes live in this browser’s localStorage. They are not sent to any server and disappear if you clear this site’s data.",
      settingsTitle: "Settings",
      close: "Close",
      demoMode: "Demo mode",
      demoHelp: "In demo mode, the app shows sample recipes without calling OpenAI and without needing a key. To generate recipes with AI from your ingredients, add your own OpenAI key and turn this mode off.",
      apiKey: "OpenAI API key",
      apiKeyPlaceholder: "Paste your key",
      apiKeyHelp: "We use the gpt-4o-mini model. The key does not go through any server of ours.",
      getKey: "Get a key from OpenAI",
      showKey: "Show key",
      hideKey: "Hide key",
      keyNotice: "Your OpenAI key stays only in this browser’s localStorage. Calls go from your computer straight to the OpenAI API; this app has no backend and does not receive or store the key on any server. Usage is billed to your OpenAI account. Don’t paste the key on a shared computer. Remove the key when you’re done, especially on devices other people use.",
      saveKey: "Save key",
      clearKey: "Remove key",
      saved: "Key saved in this browser.",
      settingsSaved: "Settings saved.",
      keyRemoved: "Key removed from this browser.",
      needIngredient: "Add at least one ingredient to generate a recipe.",
      needKey: "To generate a recipe, add your OpenAI key or turn on demo mode.",
      invalidKey: "The OpenAI key was rejected. Check that it is complete, active, and has API access.",
      networkError: "No internet connection. Check your network and try again. The OpenAI call is made directly from your browser.",
      rateLimit: "OpenAI is currently limiting requests for this key. Wait a moment and try again. If it continues, check usage and quota in your OpenAI account.",
      badResponse: "OpenAI responded, but the app couldn’t read the recipe. Try generating again. If it keeps happening, simplify the ingredient list.",
      timeout: "The request took too long and was stopped. Try again.",
      modelError: "This key could not use the gpt-4o-mini model. Check permissions and model access in your OpenAI account.",
      genericError: "Could not generate the recipe. Try again in a moment.",
      serverError: "The OpenAI server failed. Try again in a moment.",
      onlyOneDemo: "There is only one sample recipe for these filters.",
      closestDemo: "In demo mode, this is the closest sample recipe to the filters you chose.",
      recipeLangPt: "Recipe generated in Portuguese.",
      recipeLangEn: "Recipe generated in English.",
      readyAnnounce: "Recipe ready: {title}",
      nutritionTab: "Nutrition",
      stepsTab: "Steps",
      ingredientLimit: "Names can be at most 60 characters.",
      loading: "Putting your recipe together…",
      loadingSub: "This may take a few seconds.",
      loadingLive: "Generating recipe. Please wait.",
      variation: "Generate another variation",
      newRecipe: "New recipe",
      copy: "Copy recipe",
      copied: "Recipe copied",
      copyFail: "Could not copy. Try again.",
      saveFav: "Save to favorites",
      savedFavLabel: "Saved to favorites",
      savedFav: "Recipe saved to favorites.",
      removedFav: "Recipe removed from favorites.",
      removeFavAction: "Remove from favorites",
      removeFav: "Remove",
      favSaveFail: "Could not save to favorites in this browser.",
      favEmpty: "No saved recipes yet. When you find one you want to keep, tap “Save to favorites”. They stay only in this browser.",
      have: "You already have",
      need: "Need to buy",
      haveIntro: "Based on what you entered.",
      needEmpty: "You already have everything this recipe calls for.",
      ingredients: "Ingredients",
      steps: "Method",
      tips: "Tips",
      nutrition: "Nutrition (estimate)",
      nutritionDisclaimer: "An AI-generated estimate based on the ingredients provided. It is not nutritional or medical advice and does not replace a professional.",
      calories: "Calories",
      protein: "Protein",
      carbs: "Carbs",
      fat: "Fat",
      timeLabel: "Prep time",
      servingsLabel: "Servings",
      difficulty: "Difficulty",
      minutes: "min",
      demoNote: "Sample recipe from demo mode.",
      emptyResult: "Enter your ingredients and tap “Generate recipe”. Pantrya will lay out what you already have, what to buy, the method, tips, and a nutrition estimate.",
      retry: "Try again",
      meals: [
        { value: "", label: "Any" },
        { value: "breakfast", label: "Breakfast" },
        { value: "lunch", label: "Lunch" },
        { value: "dinner", label: "Dinner" },
        { value: "snack", label: "Snack" },
        { value: "dessert", label: "Dessert" },
      ],
      times: [
        { value: "", label: "Any" },
        { value: "15", label: "Up to 15 minutes" },
        { value: "30", label: "Up to 30 minutes" },
        { value: "45", label: "Up to 45 minutes" },
        { value: "60", label: "Up to 1 hour" },
        { value: "90", label: "Over 1 hour" },
      ],
      diets: [
        { value: "", label: "None" },
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" },
        { value: "gluten-free", label: "Gluten-free" },
        { value: "lactose-free", label: "Lactose-free" },
        { value: "seafood-free", label: "Seafood-free" },
      ],
      mealNames: { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", dessert: "Dessert" },
    },
  };

  const UNITS = {
    unit: { pt: ["unidade", "unidades"], en: ["", ""] },
    clove: { pt: ["dente", "dentes"], en: ["clove", "cloves"] },
    tbsp: { pt: ["colher de sopa", "colheres de sopa"], en: ["tbsp", "tbsp"] },
    tsp: { pt: ["colher de chá", "colheres de chá"], en: ["tsp", "tsp"] },
    g: { pt: ["g", "g"], en: ["g", "g"] },
    cup: { pt: ["xícara", "xícaras"], en: ["cup", "cups"] },
    large: { pt: ["unidade grande", "unidades grandes"], en: ["large", "large"] },
    taste: { pt: ["a gosto", "a gosto"], en: ["to taste", "to taste"] },
    serve: { pt: ["para acompanhar", "para acompanhar"], en: ["to serve", "to serve"] },
  };

  const DEMO_RECIPES = [
    {
      id: "shakshuka",
      meals: ["breakfast", "lunch"],
      maxTime: 25,
      diets: ["vegetarian", "gluten-free", "lactose-free", "seafood-free"],
      keys: ["ovo", "egg", "tomate", "tomato", "cebola", "onion", "alho", "garlic", "pimentao", "pimentão", "bell pepper", "pepper", "azeite", "olive oil"],
      ingredients: [
        { keys: ["ovo", "egg"], qty: 4, unit: "unit", name: { pt: "ovos", en: "eggs" } },
        { keys: ["tomate", "tomato"], qty: 4, unit: "unit", name: { pt: "tomates maduros", en: "ripe tomatoes" } },
        { keys: ["pimentao", "pimentão", "bell pepper", "pepper"], qty: 1, unit: "unit", name: { pt: "pimentão", en: "bell pepper" } },
        { keys: ["cebola", "onion"], qty: 1, unit: "unit", name: { pt: "cebola", en: "onion" } },
        { keys: ["alho", "garlic"], qty: 2, unit: "clove", name: { pt: "alho", en: "garlic" } },
        { keys: ["azeite", "olive oil"], qty: 2, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["cominho", "cumin"], qty: 1, unit: "tsp", name: { pt: "cominho", en: "cumin" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
        { keys: ["salsa", "coentro", "parsley", "cilantro"], qty: null, unit: "taste", name: { pt: "salsa ou coentro", en: "parsley or cilantro" } },
      ],
      pt: {
        title: "Shakshuka de tomate e pimentão",
        description: "Ovos pochê num molho de tomate bem temperado, pronto em uma única frigideira. Café da manhã — ou almoço — com cara de restaurante.",
        difficulty: "Fácil",
        steps: [
          "Aqueça o azeite numa frigideira. Refogue a cebola e o pimentão picados até amolecerem, cerca de 5 minutos.",
          "Junte o alho e o cominho. Quando soltar aroma, acrescente os tomates picados, sal e pimenta.",
          "Deixe o molho engrossar em fogo médio por 8 a 10 minutos, amassando os tomates com a colher.",
          "Faça covinhas no molho e quebre um ovo em cada uma. Tampe e cozinhe 5 a 7 minutos, até a clara firmar e a gema ficar mole.",
          "Finalize com salsa ou coentro e sirva direto da frigideira.",
        ],
        tips: [
          "Se o molho secar demais, acrescente um gole de água.",
          "Uma pitada de pimenta calabresa deixa o prato mais marcado.",
          "Tomate pelado de lata funciona bem quando o fresco está fora de época.",
        ],
        nutrition: { calories: 280, protein: "16 g", carbs: "14 g", fat: "18 g" },
      },
      en: {
        title: "Tomato and pepper shakshuka",
        description: "Poached eggs in a well-seasoned tomato sauce, all in one skillet. A restaurant-style breakfast — or lunch.",
        difficulty: "Easy",
        steps: [
          "Warm the olive oil in a skillet. Sauté the chopped onion and pepper until soft, about 5 minutes.",
          "Add the garlic and cumin. When fragrant, stir in the chopped tomatoes, salt and pepper.",
          "Let the sauce thicken over medium heat for 8 to 10 minutes, crushing the tomatoes with a spoon.",
          "Make wells in the sauce and crack an egg into each. Cover and cook 5 to 7 minutes, until the whites are set and the yolks are still soft.",
          "Finish with parsley or cilantro and serve straight from the pan.",
        ],
        tips: [
          "If the sauce gets too dry, add a splash of water.",
          "A pinch of chili flakes gives the dish more depth.",
          "Canned peeled tomatoes work well when fresh ones are out of season.",
        ],
        nutrition: { calories: 280, protein: "16 g", carbs: "14 g", fat: "18 g" },
      },
    },
    {
      id: "chicken-skillet",
      meals: ["lunch", "dinner"],
      maxTime: 30,
      diets: ["gluten-free", "lactose-free", "seafood-free"],
      keys: ["frango", "chicken", "cebola", "onion", "alho", "garlic", "pimentao", "pimentão", "bell pepper", "cenoura", "carrot", "azeite", "olive oil", "limao", "limão", "lemon"],
      ingredients: [
        { keys: ["frango", "chicken"], qty: 400, unit: "g", name: { pt: "peito de frango", en: "chicken breast" } },
        { keys: ["cebola", "onion"], qty: 1, unit: "large", name: { pt: "cebola", en: "onion" } },
        { keys: ["alho", "garlic"], qty: 3, unit: "clove", name: { pt: "alho", en: "garlic" } },
        { keys: ["pimentao", "pimentão", "bell pepper", "pepper"], qty: 1, unit: "unit", name: { pt: "pimentão", en: "bell pepper" } },
        { keys: ["cenoura", "carrot"], qty: 1, unit: "unit", name: { pt: "cenoura", en: "carrot" } },
        { keys: ["azeite", "olive oil"], qty: 2, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["limao", "limão", "lemon"], qty: 0.5, unit: "unit", name: { pt: "limão", en: "lemon" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
        { keys: ["arroz", "rice", "batata", "potato"], qty: null, unit: "serve", name: { pt: "arroz ou batata", en: "rice or potatoes" } },
      ],
      pt: {
        title: "Frango acebolado com legumes na frigideira",
        description: "Peito de frango dourado com cebola, pimentão e um toque de limão. Um prato completo, rápido e cheio de sabor.",
        difficulty: "Fácil",
        steps: [
          "Corte o frango em tiras, tempere com sal, pimenta e o suco de limão. Reserve 10 minutos.",
          "Aqueça o azeite numa frigideira grande e doure o frango, 3 a 4 minutos de cada lado. Retire e reserve.",
          "Na mesma panela, refogue a cebola, o alho, a cenoura em rodelas e o pimentão até ficarem macios.",
          "Volte o frango à frigideira, misture e deixe apurar 3 minutos.",
          "Ajuste o sal e sirva com arroz ou batata assada.",
        ],
        tips: [
          "Não sobrecarregue a frigideira: doure o frango em duas fornadas se preciso.",
          "Uma pitada de páprica defumada deixa o prato mais marcado.",
          "As sobras ficam ótimas no dia seguinte, em marmita ou wrap.",
        ],
        nutrition: { calories: 420, protein: "38 g", carbs: "18 g", fat: "20 g" },
      },
      en: {
        title: "Skillet chicken with onions and vegetables",
        description: "Golden chicken strips with onion, bell pepper and a squeeze of lemon. A complete, quick, flavorful plate.",
        difficulty: "Easy",
        steps: [
          "Slice the chicken, season with salt, pepper and lemon juice, and rest for 10 minutes.",
          "Heat the olive oil in a large skillet and brown the chicken 3 to 4 minutes per side. Set aside.",
          "In the same pan, sauté the onion, garlic, sliced carrot and pepper until soft.",
          "Return the chicken to the skillet and cook 3 more minutes so it picks up the vegetable flavor.",
          "Adjust the seasoning and serve with rice or roasted potatoes.",
        ],
        tips: [
          "Don’t crowd the pan: brown the chicken in two batches if needed.",
          "A pinch of smoked paprika gives the dish more depth.",
          "Leftovers are excellent the next day in a lunch box or wrap.",
        ],
        nutrition: { calories: 420, protein: "38 g", carbs: "18 g", fat: "20 g" },
      },
    },
    {
      id: "chickpea-bowl",
      meals: ["lunch", "dinner", "snack"],
      maxTime: 20,
      diets: ["vegetarian", "vegan", "gluten-free", "lactose-free", "seafood-free"],
      keys: ["grao-de-bico", "grão-de-bico", "chickpea", "chickpeas", "tomate", "tomato", "cebola", "onion", "limao", "limão", "lemon", "azeite", "olive oil", "espinafre", "spinach"],
      ingredients: [
        { keys: ["grao-de-bico", "grão-de-bico", "chickpea", "chickpeas"], qty: 300, unit: "g", name: { pt: "grão-de-bico cozido", en: "cooked chickpeas" } },
        { keys: ["tomate", "tomato"], qty: 2, unit: "unit", name: { pt: "tomate", en: "tomatoes" } },
        { keys: ["cebola", "onion"], qty: 0.5, unit: "unit", name: { pt: "cebola roxa", en: "red onion" } },
        { keys: ["pepino", "cucumber"], qty: 0.5, unit: "unit", name: { pt: "pepino", en: "cucumber" } },
        { keys: ["espinafre", "spinach"], qty: 2, unit: "cup", name: { pt: "espinafre ou rúcula", en: "spinach or arugula" } },
        { keys: ["azeite", "olive oil"], qty: 2, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["limao", "limão", "lemon"], qty: 1, unit: "unit", name: { pt: "limão", en: "lemon" } },
        { keys: ["alho", "garlic"], qty: 1, unit: "clove", name: { pt: "alho", en: "garlic" } },
        { keys: ["sal", "cominho", "salt", "cumin"], qty: null, unit: "taste", name: { pt: "sal e cominho", en: "salt and cumin" } },
      ],
      pt: {
        title: "Salada morna de grão-de-bico e vegetais",
        description: "Um bowl fresco e proteico, pronto em 20 minutos. Ideal para almoço leve — e 100% vegetal.",
        difficulty: "Fácil",
        steps: [
          "Escorra e enxágue o grão-de-bico. Aqueça uma colher de azeite e refogue-o 4 minutos com alho e cominho.",
          "Pique o tomate, o pepino e a cebola roxa em cubos pequenos.",
          "Misture os vegetais crus com o grão-de-bico morno, o suco de limão, o restante do azeite e o sal.",
          "Acomode sobre as folhas de espinafre ou rúcula e sirva imediatamente.",
          "Para um prato mais sustantivo, coloque por cima de arroz ou quinoa.",
        ],
        tips: [
          "Deixe a cebola 5 minutos no limão antes de misturar: ela fica mais macia e menos ardida.",
          "Uma colher de tahine deixa o molho mais cremoso.",
          "Renderiza bem como marmita: guarde o molho à parte e misture na hora.",
        ],
        nutrition: { calories: 360, protein: "14 g", carbs: "38 g", fat: "16 g" },
      },
      en: {
        title: "Warm chickpea and vegetable salad",
        description: "A fresh, protein-rich bowl ready in 20 minutes. A light lunch — and fully plant-based.",
        difficulty: "Easy",
        steps: [
          "Drain and rinse the chickpeas. Warm a spoonful of olive oil and sauté them for 4 minutes with garlic and cumin.",
          "Dice the tomato, cucumber and red onion.",
          "Toss the raw vegetables with the warm chickpeas, lemon juice, the rest of the olive oil and salt.",
          "Serve over spinach or arugula right away.",
          "For a more filling plate, spoon it over rice or quinoa.",
        ],
        tips: [
          "Soak the onion in lemon juice for 5 minutes first: it turns milder and softer.",
          "A spoonful of tahini makes the dressing creamier.",
          "Works well as meal prep: keep the dressing separate and toss when serving.",
        ],
        nutrition: { calories: 360, protein: "14 g", carbs: "38 g", fat: "16 g" },
      },
    },
    {
      id: "banana-oats",
      meals: ["breakfast"],
      maxTime: 10,
      diets: ["vegetarian", "vegan", "gluten-free", "lactose-free", "seafood-free"],
      keys: ["banana", "aveia", "oats", "leite", "milk"],
      ingredients: [
        { keys: ["banana"], qty: 2, unit: "unit", name: { pt: "bananas maduras", en: "ripe bananas" } },
        { keys: ["aveia", "oats"], qty: 1, unit: "cup", name: { pt: "aveia em flocos", en: "rolled oats" } },
        { keys: ["leite", "milk"], qty: 1, unit: "cup", name: { pt: "leite vegetal", en: "plant milk" } },
        { keys: ["limao", "limão", "lemon"], qty: 0.25, unit: "unit", name: { pt: "limão (opcional)", en: "lemon (optional)" } },
        { keys: ["canela", "cinnamon"], qty: null, unit: "taste", name: { pt: "canela", en: "cinnamon" } },
      ],
      pt: {
        title: "Mingau rápido de banana e aveia",
        description: "Café da manhã cremoso em 10 minutos, só com o que costuma estar no armário. Naturalmente doce, sem açúcar.",
        difficulty: "Fácil",
        steps: [
          "Amasse as bananas numa panela pequena.",
          "Junte a aveia, o leite vegetal e a canela. Leve ao fogo médio.",
          "Mexa por 5 a 7 minutos, até engrossar e a aveia amolecer.",
          "Ajuste a consistência com um gole a mais de leite, se quiser.",
          "Sirva morno, com um fio de limão se gostar de um toque cítrico.",
        ],
        tips: [
          "Bananas bem maduras adoçam o suficiente, sem açúcar.",
          "Use aveia certificada sem glúten se essa for a sua restrição.",
          "Também funciona frio, como um overnight oats rápido.",
        ],
        nutrition: { calories: 310, protein: "8 g", carbs: "58 g", fat: "6 g" },
      },
      en: {
        title: "Quick banana oat porridge",
        description: "A creamy breakfast in 10 minutes, with pantry staples. Naturally sweet, with no added sugar.",
        difficulty: "Easy",
        steps: [
          "Mash the bananas in a small saucepan.",
          "Add the oats, plant milk and cinnamon. Set over medium heat.",
          "Stir for 5 to 7 minutes, until thick and the oats are soft.",
          "Loosen with a splash more milk if you like.",
          "Serve warm, with a squeeze of lemon if you want a citrus note.",
        ],
        tips: [
          "Very ripe bananas sweeten the bowl enough — no sugar needed.",
          "Use certified gluten-free oats if that is your restriction.",
          "It also works cold, as a quick overnight oats.",
        ],
        nutrition: { calories: 310, protein: "8 g", carbs: "58 g", fat: "6 g" },
      },
    },
    {
      id: "banana-nice-cream",
      meals: ["dessert"],
      maxTime: 10,
      diets: ["vegetarian", "vegan", "gluten-free", "lactose-free", "seafood-free"],
      keys: ["banana", "aveia", "oats"],
      ingredients: [
        { keys: ["banana"], qty: 3, unit: "unit", name: { pt: "bananas congeladas", en: "frozen bananas" } },
        { keys: ["aveia", "oats"], qty: 2, unit: "tbsp", name: { pt: "aveia em flocos", en: "rolled oats" } },
        { keys: ["limao", "limão", "lemon"], qty: 0.5, unit: "unit", name: { pt: "limão", en: "lemon" } },
        { keys: ["canela", "cinnamon"], qty: null, unit: "taste", name: { pt: "canela", en: "cinnamon" } },
      ],
      pt: {
        title: "Sorvete de banana (nice cream)",
        description: "Sobremesa gelada em 10 minutos, só com banana e um toque de aveia. Cremosa, vegetal e sem açúcar.",
        difficulty: "Fácil",
        steps: [
          "Corte as bananas congeladas em pedaços e leve ao processador ou liquidificador potente.",
          "Bata com a aveia, o suco de limão e a canela até ficar cremoso, parando para raspar as laterais.",
          "Se precisar, acrescente uma colher de água ou leite vegetal só para o aparelho girar.",
          "Sirva imediatamente, como um sorvete mole.",
          "Para um corte mais firme, leve 20 minutos ao freezer antes de servir.",
        ],
        tips: [
          "Congele as bananas já picadas: o processamento fica bem mais fácil.",
          "Um fio de azeite ou uma colher de pasta de amendoim deixa o creme mais sedoso.",
          "Não deixe bater demais depois de cremoso, para não derreter.",
        ],
        nutrition: { calories: 190, protein: "3 g", carbs: "46 g", fat: "1 g" },
      },
      en: {
        title: "Banana nice cream",
        description: "A frozen dessert in 10 minutes, with banana and a little oats. Creamy, plant-based, and unsweetened.",
        difficulty: "Easy",
        steps: [
          "Cut the frozen bananas into chunks and add them to a food processor or a strong blender.",
          "Blend with the oats, lemon juice and cinnamon until creamy, stopping to scrape the sides.",
          "If needed, add a spoonful of water or plant milk just so the blades can move.",
          "Serve right away, like a soft ice cream.",
          "For a firmer scoop, freeze for 20 minutes before serving.",
        ],
        tips: [
          "Freeze the bananas already sliced: they blend much more easily.",
          "A drizzle of olive oil or a spoon of peanut butter makes the cream silkier.",
          "Don’t keep blending once it’s creamy, or it will start to melt.",
        ],
        nutrition: { calories: 190, protein: "3 g", carbs: "46 g", fat: "1 g" },
      },
    },
    {
      id: "tomato-pasta",
      meals: ["lunch", "dinner"],
      maxTime: 20,
      diets: ["vegetarian", "vegan", "lactose-free", "seafood-free"],
      keys: ["macarrao", "macarrão", "pasta", "tomate", "tomato", "alho", "garlic", "azeite", "olive oil", "cebola", "onion"],
      ingredients: [
        { keys: ["macarrao", "macarrão", "pasta"], qty: 200, unit: "g", name: { pt: "macarrão", en: "pasta" } },
        { keys: ["tomate", "tomato"], qty: 3, unit: "unit", name: { pt: "tomates", en: "tomatoes" } },
        { keys: ["cebola", "onion"], qty: 0.5, unit: "unit", name: { pt: "cebola", en: "onion" } },
        { keys: ["alho", "garlic"], qty: 3, unit: "clove", name: { pt: "alho", en: "garlic" } },
        { keys: ["azeite", "olive oil"], qty: 2, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
      ],
      pt: {
        title: "Macarrão ao alho e tomate",
        description: "Um clássico de despensa em 20 minutos: macarrão com tomate fresco, alho e azeite. Simples e cheio de sabor.",
        difficulty: "Fácil",
        steps: [
          "Ferva o macarrão em água bem salgada até ficar al dente. Reserve um pouco da água do cozimento.",
          "Enquanto isso, aqueça o azeite e refogue a cebola e o alho em fogo médio, sem deixar queimar.",
          "Acrescente os tomates picados, sal e pimenta. Cozinhe 8 minutos, até formar um molho rústico.",
          "Misture o macarrão escorrido ao molho, soltando com uma concha da água reservada se necessário.",
          "Sirva imediatamente, com um fio de azeite por cima.",
        ],
        tips: [
          "A água do macarrão ajuda o molho a agarrar na massa.",
          "Se tiver manjericão ou salsa, junte no final.",
          "Para um molho mais encorpado, amasse parte dos tomates na panela.",
        ],
        nutrition: { calories: 430, protein: "13 g", carbs: "68 g", fat: "12 g" },
      },
      en: {
        title: "Tomato and garlic pasta",
        description: "A 20-minute pantry classic: pasta with fresh tomato, garlic and olive oil. Simple and full of flavor.",
        difficulty: "Easy",
        steps: [
          "Boil the pasta in well-salted water until al dente. Save a little of the cooking water.",
          "Meanwhile, warm the olive oil and sauté the onion and garlic over medium heat, without letting them burn.",
          "Add the chopped tomatoes, salt and pepper. Cook for 8 minutes, until you have a rustic sauce.",
          "Toss the drained pasta with the sauce, loosening with a splash of the reserved water if needed.",
          "Serve immediately, with a drizzle of olive oil on top.",
        ],
        tips: [
          "Pasta water helps the sauce cling to the noodles.",
          "If you have basil or parsley, stir it in at the end.",
          "For a thicker sauce, crush some of the tomatoes in the pan.",
        ],
        nutrition: { calories: 430, protein: "13 g", carbs: "68 g", fat: "12 g" },
      },
    },
    {
      id: "veggie-rice",
      meals: ["lunch", "dinner"],
      maxTime: 30,
      diets: ["vegetarian", "vegan", "gluten-free", "lactose-free", "seafood-free"],
      keys: ["arroz", "rice", "cebola", "onion", "alho", "garlic", "pimentao", "pimentão", "bell pepper", "azeite", "olive oil", "espinafre", "spinach"],
      ingredients: [
        { keys: ["arroz", "rice"], qty: 1, unit: "cup", name: { pt: "arroz", en: "rice" } },
        { keys: ["cebola", "onion"], qty: 1, unit: "unit", name: { pt: "cebola", en: "onion" } },
        { keys: ["alho", "garlic"], qty: 2, unit: "clove", name: { pt: "alho", en: "garlic" } },
        { keys: ["pimentao", "pimentão", "bell pepper", "pepper"], qty: 1, unit: "unit", name: { pt: "pimentão", en: "bell pepper" } },
        { keys: ["cenoura", "carrot"], qty: 1, unit: "unit", name: { pt: "cenoura", en: "carrot" } },
        { keys: ["espinafre", "spinach"], qty: 2, unit: "cup", name: { pt: "espinafre", en: "spinach" } },
        { keys: ["azeite", "olive oil"], qty: 2, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["limao", "limão", "lemon"], qty: 0.5, unit: "unit", name: { pt: "limão", en: "lemon" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
      ],
      pt: {
        title: "Arroz de legumes na frigideira",
        description: "Arroz soltinho com pimentão, cenoura e espinafre. Um almoço ou jantar vegetal pronto em meia hora.",
        difficulty: "Fácil",
        steps: [
          "Enxágue o arroz. Aqueça o azeite e refogue a cebola, o alho, a cenoura e o pimentão por 5 minutos.",
          "Acrescente o arroz e mexa 1 minuto, até ele brilhar no azeite.",
          "Cubra com duas xícaras de água quente, tempere com sal e pimenta e cozinhe em fogo baixo, tampado, por cerca de 15 minutos.",
          "Quando a água secar, junte o espinafre, mexa e deixe 2 minutos só para murchar.",
          "Finalize com o suco de limão e sirva.",
        ],
        tips: [
          "Não mexa o arroz enquanto cozinha, para ele ficar soltinho.",
          "Sobras viram uma ótima refeição fria no dia seguinte.",
          "Se tiver cominho ou páprica, coloque junto com o alho.",
        ],
        nutrition: { calories: 390, protein: "8 g", carbs: "64 g", fat: "11 g" },
      },
      en: {
        title: "Skillet vegetable rice",
        description: "Fluffy rice with bell pepper, carrot and spinach. A plant-based lunch or dinner ready in half an hour.",
        difficulty: "Easy",
        steps: [
          "Rinse the rice. Warm the olive oil and sauté the onion, garlic, carrot and pepper for 5 minutes.",
          "Add the rice and stir for 1 minute, until it glistens in the oil.",
          "Pour in two cups of hot water, season with salt and pepper and cook on low, covered, for about 15 minutes.",
          "When the water is absorbed, fold in the spinach and let it wilt for 2 minutes.",
          "Finish with lemon juice and serve.",
        ],
        tips: [
          "Don’t stir the rice while it cooks, so the grains stay separate.",
          "Leftovers make an excellent cold lunch the next day.",
          "If you have cumin or paprika, add it with the garlic.",
        ],
        nutrition: { calories: 390, protein: "8 g", carbs: "64 g", fat: "11 g" },
      },
    },
    {
      id: "potato-tortilla",
      meals: ["breakfast", "lunch", "dinner"],
      maxTime: 35,
      diets: ["vegetarian", "gluten-free", "lactose-free", "seafood-free"],
      keys: ["batata", "potato", "ovo", "egg", "cebola", "onion", "azeite", "olive oil"],
      ingredients: [
        { keys: ["batata", "potato"], qty: 3, unit: "unit", name: { pt: "batatas", en: "potatoes" } },
        { keys: ["ovo", "egg"], qty: 4, unit: "unit", name: { pt: "ovos", en: "eggs" } },
        { keys: ["cebola", "onion"], qty: 1, unit: "unit", name: { pt: "cebola", en: "onion" } },
        { keys: ["azeite", "olive oil"], qty: 3, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
      ],
      pt: {
        title: "Tortilha de batata e ovo",
        description: "Batata, ovo, cebola e azeite: uma tortilha dourada que serve de café, almoço ou jantar.",
        difficulty: "Médio",
        steps: [
          "Descasque e corte as batatas em rodelas finas. Pique a cebola.",
          "Aqueça o azeite numa frigideira e cozinhe a batata e a cebola em fogo médio, mexendo com cuidado, até ficarem macias (cerca de 12 minutos).",
          "Bata os ovos com sal e pimenta. Escorra o excesso de azeite da frigideira e misture os ovos às batatas.",
          "Cozinhe tampado 6 a 8 minutos, até a base dourar. Vire com a ajuda de um prato e doure o outro lado.",
          "Deixe descansar 2 minutos e sirva em fatias.",
        ],
        tips: [
          "Uma frigideira antiaderente deixa a virada muito mais fácil.",
          "Se a tortilha estiver muito alta, termine 3 minutos no forno.",
          "Fica excelente fria, como lanche no dia seguinte.",
        ],
        nutrition: { calories: 410, protein: "16 g", carbs: "32 g", fat: "24 g" },
      },
      en: {
        title: "Potato and egg tortilla",
        description: "Potato, egg, onion and olive oil: a golden tortilla that works for breakfast, lunch or dinner.",
        difficulty: "Medium",
        steps: [
          "Peel and slice the potatoes thinly. Chop the onion.",
          "Warm the olive oil in a skillet and cook the potato and onion over medium heat, stirring gently, until soft (about 12 minutes).",
          "Beat the eggs with salt and pepper. Drain the excess oil and pour the eggs over the potatoes.",
          "Cook covered for 6 to 8 minutes, until the base is golden. Invert onto a plate and brown the other side.",
          "Rest for 2 minutes and serve in wedges.",
        ],
        tips: [
          "A non-stick skillet makes the flip much easier.",
          "If the tortilla is very thick, finish it in the oven for 3 minutes.",
          "It’s excellent cold, as a snack the next day.",
        ],
        nutrition: { calories: 410, protein: "16 g", carbs: "32 g", fat: "24 g" },
      },
    },
    {
      id: "roasted-potatoes",
      meals: ["snack", "dinner"],
      maxTime: 45,
      diets: ["vegetarian", "vegan", "gluten-free", "lactose-free", "seafood-free"],
      keys: ["batata", "potato", "azeite", "olive oil", "alho", "garlic", "limao", "limão", "lemon"],
      ingredients: [
        { keys: ["batata", "potato"], qty: 4, unit: "unit", name: { pt: "batatas", en: "potatoes" } },
        { keys: ["azeite", "olive oil"], qty: 2, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["alho", "garlic"], qty: 3, unit: "clove", name: { pt: "alho", en: "garlic" } },
        { keys: ["limao", "limão", "lemon"], qty: 1, unit: "unit", name: { pt: "limão", en: "lemon" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
      ],
      pt: {
        title: "Batatas rústicas no forno com alho e limão",
        description: "Batatas crocantes por fora e macias por dentro, com alho e limão. Um lanche ou acompanhamento de 45 minutos.",
        difficulty: "Fácil",
        steps: [
          "Aqueça o forno a 220 °C. Corte as batatas em cubos, com casca se estiver limpa.",
          "Misture com azeite, alho amassado, sal e pimenta numa assadeira.",
          "Asse 35 a 40 minutos, virando na metade do tempo, até dourar.",
          "Regue com o suco de limão ainda quente e misture.",
          "Sirva imediatamente, como lanche ou acompanhamento.",
        ],
        tips: [
          "O forno bem quente é o que deixa a casca crocante.",
          "Uma pitada de páprica ou alecrim muda o perfil do prato.",
          "Cubos mais ou menos do mesmo tamanho assam de forma uniforme.",
        ],
        nutrition: { calories: 280, protein: "5 g", carbs: "46 g", fat: "9 g" },
      },
      en: {
        title: "Roasted potatoes with garlic and lemon",
        description: "Potatoes crisp on the outside and soft inside, with garlic and lemon. A 45-minute snack or side.",
        difficulty: "Easy",
        steps: [
          "Heat the oven to 220 °C (425 °F). Cut the potatoes into cubes, leaving the skin on if it’s clean.",
          "Toss with olive oil, crushed garlic, salt and pepper on a baking tray.",
          "Roast for 35 to 40 minutes, turning halfway, until golden.",
          "Squeeze the lemon over the potatoes while they’re still hot and toss.",
          "Serve right away, as a snack or a side.",
        ],
        tips: [
          "A hot oven is what makes the edges crisp.",
          "A pinch of paprika or rosemary changes the profile of the dish.",
          "Cubes of roughly the same size roast more evenly.",
        ],
        nutrition: { calories: 280, protein: "5 g", carbs: "46 g", fat: "9 g" },
      },
    },
    {
      id: "chicken-rice",
      meals: ["dinner"],
      maxTime: 40,
      diets: ["gluten-free", "lactose-free", "seafood-free"],
      keys: ["frango", "chicken", "arroz", "rice", "cebola", "onion", "alho", "garlic", "azeite", "olive oil", "limao", "limão", "lemon"],
      ingredients: [
        { keys: ["frango", "chicken"], qty: 400, unit: "g", name: { pt: "peito de frango", en: "chicken breast" } },
        { keys: ["arroz", "rice"], qty: 1, unit: "cup", name: { pt: "arroz", en: "rice" } },
        { keys: ["cebola", "onion"], qty: 1, unit: "unit", name: { pt: "cebola", en: "onion" } },
        { keys: ["alho", "garlic"], qty: 2, unit: "clove", name: { pt: "alho", en: "garlic" } },
        { keys: ["azeite", "olive oil"], qty: 2, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["limao", "limão", "lemon"], qty: 1, unit: "unit", name: { pt: "limão", en: "lemon" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
      ],
      pt: {
        title: "Arroz de frango de uma panela só",
        description: "Jantar completo em 40 minutos: frango suculento cozido junto com o arroz, alho e limão.",
        difficulty: "Fácil",
        steps: [
          "Tempere o frango em cubos com sal, pimenta e metade do limão.",
          "Aqueça o azeite e doure o frango. Retire e, na mesma panela, refogue a cebola e o alho.",
          "Junte o arroz, mexa 1 minuto e volte o frango. Cubra com duas xícaras de água quente.",
          "Cozinhe tampado em fogo baixo por 18 a 20 minutos, até o arroz ficar macio.",
          "Desligue, regue com o restante do limão e deixe descansar 5 minutos antes de servir.",
        ],
        tips: [
          "O descanso final deixa o arroz mais solto e o frango mais suculento.",
          "Se a água secar antes do arroz assar, acrescente um gole quente.",
          "Salsinha picada no final dá cor e frescor.",
        ],
        nutrition: { calories: 480, protein: "36 g", carbs: "52 g", fat: "14 g" },
      },
      en: {
        title: "One-pan chicken and rice",
        description: "A complete dinner in 40 minutes: juicy chicken cooked with the rice, garlic and lemon.",
        difficulty: "Easy",
        steps: [
          "Season the cubed chicken with salt, pepper and half the lemon.",
          "Heat the olive oil and brown the chicken. Set it aside and, in the same pan, sauté the onion and garlic.",
          "Add the rice, stir for 1 minute, then return the chicken. Pour in two cups of hot water.",
          "Cook covered on low heat for 18 to 20 minutes, until the rice is tender.",
          "Turn off the heat, add the rest of the lemon and let it rest 5 minutes before serving.",
        ],
        tips: [
          "The final rest makes the rice fluffier and the chicken juicier.",
          "If the water dries before the rice is done, add a splash of hot water.",
          "Chopped parsley at the end adds color and freshness.",
        ],
        nutrition: { calories: 480, protein: "36 g", carbs: "52 g", fat: "14 g" },
      },
    },
    {
      id: "spinach-omelette",
      meals: ["breakfast", "lunch", "snack"],
      maxTime: 15,
      diets: ["vegetarian", "gluten-free", "lactose-free", "seafood-free"],
      keys: ["ovo", "egg", "espinafre", "spinach", "tomate", "tomato", "cebola", "onion", "azeite", "olive oil"],
      ingredients: [
        { keys: ["ovo", "egg"], qty: 3, unit: "unit", name: { pt: "ovos", en: "eggs" } },
        { keys: ["espinafre", "spinach"], qty: 2, unit: "cup", name: { pt: "espinafre", en: "spinach" } },
        { keys: ["tomate", "tomato"], qty: 1, unit: "unit", name: { pt: "tomate", en: "tomato" } },
        { keys: ["cebola", "onion"], qty: 0.5, unit: "unit", name: { pt: "cebola", en: "onion" } },
        { keys: ["azeite", "olive oil"], qty: 1, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
      ],
      pt: {
        title: "Omelete de espinafre e tomate",
        description: "Um lanche — ou café da manhã — pronto em 15 minutos, com ovos, espinafre e tomate.",
        difficulty: "Fácil",
        steps: [
          "Bata os ovos com sal e pimenta.",
          "Aqueça o azeite e refogue a cebola e o tomate picados por 2 minutos. Junte o espinafre até murchar.",
          "Despeje os ovos e espalhe os vegetais. Cozinhe em fogo médio-baixo até a base firmar.",
          "Dobre a omelete ao meio e deixe 1 minuto.",
          "Sirva imediatamente.",
        ],
        tips: [
          "Fogo mais baixo deixa a omelete mais fofa e menos seca.",
          "Se tiver ervas frescas, misture nos ovos batidos.",
          "Vira um lanche completo com uma salada verde ao lado.",
        ],
        nutrition: { calories: 260, protein: "18 g", carbs: "6 g", fat: "18 g" },
      },
      en: {
        title: "Spinach and tomato omelette",
        description: "A snack — or breakfast — ready in 15 minutes, with eggs, spinach and tomato.",
        difficulty: "Easy",
        steps: [
          "Beat the eggs with salt and pepper.",
          "Warm the olive oil and sauté the chopped onion and tomato for 2 minutes. Add the spinach and let it wilt.",
          "Pour in the eggs and spread the vegetables through. Cook over medium-low heat until the base is set.",
          "Fold the omelette in half and cook 1 more minute.",
          "Serve immediately.",
        ],
        tips: [
          "Lower heat keeps the omelette fluffier and less dry.",
          "If you have fresh herbs, beat them into the eggs.",
          "It becomes a complete snack with a green salad on the side.",
        ],
        nutrition: { calories: 260, protein: "18 g", carbs: "6 g", fat: "18 g" },
      },
    },
    {
      id: "roast-chicken-potato",
      meals: ["dinner"],
      maxTime: 75,
      diets: ["gluten-free", "lactose-free", "seafood-free"],
      keys: ["frango", "chicken", "batata", "potato", "cebola", "onion", "alho", "garlic", "azeite", "olive oil", "limao", "limão", "lemon", "pimentao", "pimentão", "bell pepper"],
      ingredients: [
        { keys: ["frango", "chicken"], qty: 500, unit: "g", name: { pt: "coxas ou peito de frango", en: "chicken thighs or breast" } },
        { keys: ["batata", "potato"], qty: 4, unit: "unit", name: { pt: "batatas", en: "potatoes" } },
        { keys: ["cebola", "onion"], qty: 1, unit: "unit", name: { pt: "cebola", en: "onion" } },
        { keys: ["alho", "garlic"], qty: 4, unit: "clove", name: { pt: "alho", en: "garlic" } },
        { keys: ["pimentao", "pimentão", "bell pepper", "pepper"], qty: 1, unit: "unit", name: { pt: "pimentão", en: "bell pepper" } },
        { keys: ["azeite", "olive oil"], qty: 3, unit: "tbsp", name: { pt: "azeite de oliva", en: "olive oil" } },
        { keys: ["limao", "limão", "lemon"], qty: 1, unit: "unit", name: { pt: "limão", en: "lemon" } },
        { keys: ["sal", "pimenta", "salt", "pepper"], qty: null, unit: "taste", name: { pt: "sal e pimenta", en: "salt and pepper" } },
      ],
      pt: {
        title: "Frango assado com batatas e limão",
        description: "Jantar de forno para fazer com calma: frango, batata, pimentão e limão assam juntos em uma hora e um pouco.",
        difficulty: "Fácil",
        steps: [
          "Aqueça o forno a 200 °C. Corte as batatas em gomos, a cebola em pedaços e o pimentão em tiras.",
          "Numa assadeira, misture os legumes e o alho com dois terços do azeite, sal e pimenta.",
          "Tempere o frango com o restante do azeite, sal, pimenta e o suco de meio limão. Acomode sobre os legumes.",
          "Asse 60 a 70 minutos, virando o frango na metade, até a pele dourar e as batatas ficarem macias.",
          "Regue com o restante do limão e deixe descansar 5 minutos antes de servir.",
        ],
        tips: [
          "Se o frango dourar cedo demais, cubra com papel-alumínio nos últimos minutos.",
          "Coxas ficam mais suculentas do que o peito nesse tempo de forno.",
          "As batatas do fundo absorvem o suco do frango — mexa-as uma vez para dourar dos dois lados.",
        ],
        nutrition: { calories: 520, protein: "38 g", carbs: "36 g", fat: "24 g" },
      },
      en: {
        title: "Roast chicken with potatoes and lemon",
        description: "An unhurried oven dinner: chicken, potatoes, pepper and lemon roast together in a little over an hour.",
        difficulty: "Easy",
        steps: [
          "Heat the oven to 200 °C (400 °F). Cut the potatoes into wedges, the onion into chunks and the pepper into strips.",
          "On a roasting tray, toss the vegetables and garlic with two-thirds of the olive oil, salt and pepper.",
          "Season the chicken with the remaining oil, salt, pepper and the juice of half a lemon. Nestle it on top of the vegetables.",
          "Roast for 60 to 70 minutes, turning the chicken halfway, until the skin is golden and the potatoes are tender.",
          "Squeeze over the rest of the lemon and rest 5 minutes before serving.",
        ],
        tips: [
          "If the chicken browns too early, cover it with foil for the last few minutes.",
          "Thighs stay juicier than breast at this roasting time.",
          "The potatoes underneath soak up the chicken juices — turn them once so both sides can brown.",
        ],
        nutrition: { calories: 520, protein: "38 g", carbs: "36 g", fat: "24 g" },
      },
    },
  ];


  const state = {
    lang: "pt",
    ingredients: [],
    demoMode: true,
    recipe: null,
    favorites: [],
    loading: false,
    variationNonce: 0,
    lastDemoIds: [],
    meal: "",
    time: "",
    diet: "",
    activeTab: "ingredients",
    lastTrigger: null,
    checkedSteps: [],
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const t = (key) => I18N[state.lang][key];

  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenMatch(a, b) {
    const na = normalize(a);
    const nb = normalize(b);
    if (!na || !nb) return false;
    return na === nb || na.includes(nb) || nb.includes(na);
  }

  function userHas(keysOrName) {
    const keys = Array.isArray(keysOrName) ? keysOrName : [keysOrName];
    return state.ingredients.some((ing) => keys.some((k) => tokenMatch(ing, k)));
  }

  function migrateStorage() {
    try {
      Object.keys(LEGACY).forEach((k) => {
        const next = localStorage.getItem(STORAGE[k]);
        const prev = localStorage.getItem(LEGACY[k]);
        if ((next === null || next === "") && prev !== null) {
          localStorage.setItem(STORAGE[k], prev);
          localStorage.removeItem(LEGACY[k]);
        } else if (next !== null && prev !== null) {
          localStorage.removeItem(LEGACY[k]);
        }
      });
    } catch { /* ignore */ }
  }

  function loadState() {
    migrateStorage();
    try {
      const lang = localStorage.getItem(STORAGE.lang);
      state.lang = lang === "en" ? "en" : "pt";
      const demo = localStorage.getItem(STORAGE.demo);
      state.demoMode = demo === null ? true : demo === "1";
      const favs = localStorage.getItem(STORAGE.favs);
      state.favorites = favs ? JSON.parse(favs) : [];
      if (!Array.isArray(state.favorites)) state.favorites = [];
    } catch {
      state.favorites = [];
    }
  }

  function getApiKey() {
    try {
      return localStorage.getItem(STORAGE.key) || "";
    } catch {
      return "";
    }
  }

  function currentTheme() {
    const stored = localStorage.getItem(STORAGE.theme);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme, persist) {
    if (theme === "dark" || theme === "light") {
      document.documentElement.setAttribute("data-theme", theme);
      if (persist) localStorage.setItem(STORAGE.theme, theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (persist) localStorage.removeItem(STORAGE.theme);
    }
    syncThemeButton();
  }

  function syncThemeButton() {
    const btn = $("#btn-theme");
    if (!btn) return;
    const dark = currentTheme() === "dark";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.setAttribute("aria-label", dark ? t("themeToLight") : t("themeToDark"));
    const sun = btn.querySelector(".icon-sun");
    const moon = btn.querySelector(".icon-moon");
    if (sun) sun.hidden = dark;
    if (moon) moon.hidden = !dark;
    const meta = $("#meta-theme-color");
    if (meta) meta.setAttribute("content", dark ? "#141311" : "#F7F1E8");
  }

  function toggleTheme() {
    applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
  }

  function applyI18n() {
    document.documentElement.lang = state.lang === "en" ? "en" : "pt-BR";
    $$("[data-i18n]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n"));
      if (typeof val === "string") el.textContent = val;
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
    $$("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    $$(".lang-btn").forEach((btn) => {
      const on = btn.dataset.lang === state.lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $("#servings-minus").setAttribute("aria-label", t("servingsMinus"));
    $("#servings-plus").setAttribute("aria-label", t("servingsPlus"));
    fillSegmented($("#filter-meal"), t("meals"), state.meal);
    fillSegmented($("#filter-time"), t("times"), state.time);
    fillSegmented($("#filter-diet"), t("diets"), state.diet);
    renderSuggestions();
    updateModePill();
    renderChips();
    if (state.recipe) renderRecipe(state.recipe, state.activeTab);
    else if (!state.loading) renderEmpty();
    renderFavoritesList();
    updateFavCount();
    syncThemeButton();
    const keyBtn = $("#toggle-key");
    if (keyBtn && $("#api-key-input").type === "text") keyBtn.textContent = t("hideKey");
    if (state.loading) {
      const label = $("#btn-generate .btn-label");
      if (label) label.textContent = t("generating");
    }
  }

  function optionsKeyFor(key) {
    return key === "meal" ? "meals" : key === "time" ? "times" : "diets";
  }

  function fillSegmented(root, options, current) {
    const value = options.some((o) => o.value === current) ? current : "";
    root.innerHTML = options.map((o, i) => {
      const on = o.value === value;
      const tab = on || (!value && i === 0) ? "0" : "-1";
      return `<button type="button" class="pn-segmented__btn${on ? " pn-segmented__btn--active" : ""}" role="radio" aria-checked="${on ? "true" : "false"}" tabindex="${tab}" data-value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</button>`;
    }).join("");
  }

  function selectSegment(root, key, value, focus) {
    state[key] = value;
    fillSegmented(root, t(optionsKeyFor(key)), value);
    if (focus) {
      const btn = root.querySelector(`[data-value="${CSS.escape(value)}"]`);
      if (btn) btn.focus();
    }
  }

  function bindSegmented(root, key) {
    root.addEventListener("click", (e) => {
      const btn = e.target.closest(".pn-segmented__btn");
      if (!btn) return;
      selectSegment(root, key, btn.dataset.value, false);
    });
    root.addEventListener("keydown", (e) => {
      const buttons = $$(".pn-segmented__btn", root);
      if (!buttons.length) return;
      let i = buttons.indexOf(document.activeElement);
      if (i < 0) i = Math.max(0, buttons.findIndex((b) => b.getAttribute("aria-checked") === "true"));
      let next = i;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % buttons.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + buttons.length) % buttons.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = buttons.length - 1;
      else return;
      e.preventDefault();
      selectSegment(root, key, buttons[next].dataset.value, true);
    });
  }

  function updateModePill() {
    const pill = $("#mode-pill");
    pill.textContent = state.demoMode ? t("demoOn") : t("liveOn");
    pill.classList.toggle("is-live", !state.demoMode);
  }

  function renderSuggestions() {
    const row = $("#suggestions");
    row.innerHTML = SUGGESTIONS[state.lang].map((name) => {
      const on = state.ingredients.some((i) => tokenMatch(i, name));
      return `<button type="button" class="suggestion${on ? " is-on" : ""}" data-suggestion="${escapeHtml(name)}">${escapeHtml(name)}</button>`;
    }).join("");
  }

  function renderChips() {
    const box = $("#ingredient-chips");
    box.innerHTML = state.ingredients.map((name, i) => `
      <span class="chip" title="${escapeHtml(name)}">
        <span class="chip-label">${escapeHtml(name)}</span>
        <button type="button" data-remove="${i}" aria-label="${escapeHtml(t("removeNamed").replace("{name}", name))}"><span aria-hidden="true">×</span></button>
      </span>
    `).join("");
    $("#chips-empty").hidden = state.ingredients.length > 0;
    $("#btn-clear").hidden = state.ingredients.length === 0;
    renderSuggestions();
  }

  const INGREDIENT_MAX = 60;

  function toggleIngredientHint(show) {
    const el = $("#ingredient-limit-hint");
    if (!el) return;
    el.hidden = !show;
    if (show) el.textContent = t("ingredientLimit");
  }

  function addIngredient(raw) {
    const parts = String(raw).split(/[,;]+/).map((s) => s.trim()).filter(Boolean);
    let added = false;
    let truncated = false;
    for (const part of parts) {
      let name = part;
      if (name.length > INGREDIENT_MAX) {
        name = name.slice(0, INGREDIENT_MAX);
        truncated = true;
      }
      if (!name) continue;
      if (state.ingredients.some((i) => tokenMatch(i, name))) continue;
      state.ingredients.push(name);
      added = true;
    }
    toggleIngredientHint(truncated);
    if (added) {
      renderChips();
      hideFormError();
    }
  }

  function removeIngredient(index) {
    state.ingredients.splice(index, 1);
    renderChips();
  }

  function clearIngredients() {
    state.ingredients = [];
    renderChips();
  }

  function servingsValue() {
    const n = Number($("#filter-servings").value);
    if (!Number.isFinite(n)) return 2;
    return Math.min(8, Math.max(1, Math.round(n)));
  }

  function syncStepper() {
    const n = servingsValue();
    $("#filter-servings").value = String(n);
    $("#servings-minus").disabled = n <= 1;
    $("#servings-plus").disabled = n >= 8;
  }

  function hideFormError() {
    const el = $("#form-error");
    el.hidden = true;
    el.textContent = "";
  }

  function showFormError(msg) {
    const el = $("#form-error");
    el.hidden = false;
    el.textContent = msg;
  }

  function setLoading(on) {
    state.loading = on;
    const btn = $("#btn-generate");
    btn.disabled = on;
    btn.setAttribute("aria-busy", on ? "true" : "false");
    $("#btn-generate .btn-spinner").hidden = !on;
    $("#btn-generate .btn-label").textContent = on ? t("generating") : t("generate");
    if (on) renderSkeleton();
  }

  function renderSkeleton() {
    const result = $("#result");
    result.hidden = false;
    result.setAttribute("aria-busy", "true");
    result.innerHTML = `
      <div class="pn-skeleton" aria-hidden="true">
        <span class="pn-skeleton__title"></span>
        <span class="pn-skeleton__line"></span>
        <span class="pn-skeleton__line pn-skeleton__line--short"></span>
        <span class="pn-skeleton__block"></span>
      </div>
      <p class="sr-only">${escapeHtml(t("loadingLive"))}</p>
      <p style="text-align:center;color:var(--pn-text-muted);margin-top:12px">${escapeHtml(t("loading"))}<br><small>${escapeHtml(t("loadingSub"))}</small></p>
    `;
  }

  function renderEmpty() {
    const result = $("#result");
    result.removeAttribute("aria-busy");
    result.innerHTML = `<p class="empty-hint">${escapeHtml(t("emptyResult"))}</p>`;
  }

  function filters() {
    return {
      meal: state.meal,
      time: state.time,
      diet: state.diet,
      servings: servingsValue(),
    };
  }

  function formatQty(n, lang) {
    const q = Math.round(n * 4) / 4;
    if (q <= 0) return lang === "en" ? "a pinch" : "uma pitada";
    const whole = Math.floor(q + 1e-9);
    const frac = Math.round((q - whole) * 4) / 4;
    const fracStr = { 0.25: "1/4", 0.5: "1/2", 0.75: "3/4" }[frac];
    if (fracStr) return whole ? `${whole} ${fracStr}` : fracStr;
    if (Number.isInteger(q)) return String(q);
    const raw = String(q);
    return lang === "pt" ? raw.replace(".", ",") : raw;
  }

  function formatAmount(qty, unit, servings, base, lang) {
    const pack = UNITS[unit] || UNITS.unit;
    const labels = pack[lang] || pack.pt;
    if (qty == null || unit === "taste" || unit === "serve") return labels[0];
    const scaled = (Number(qty) * servings) / base;
    const q = Math.round(scaled * 4) / 4;
    const singular = q <= 1 + 1e-9;
    const label = singular ? labels[0] : labels[1];
    const num = formatQty(q, lang);
    return label ? `${num} ${label}` : num;
  }

  function scaleAmount(amount, servings, base, lang) {
    if (amount == null || amount === "") return "";
    const locale = lang || state.lang;
    if (servings === base) return String(amount);
    const ratio = servings / base;
    let s = String(amount);
    s = s.replace(/(\d+)\s*\/\s*(\d+)/g, (_, a, b) => {
      const n = (Number(a) / Number(b)) * ratio;
      return formatQty(Math.round(n * 4) / 4, locale);
    });
    s = s.replace(/(\d+(?:[.,]\d+)?)/g, (m, _g, offset, whole) => {
      if (offset > 0 && whole[offset - 1] === "/") return m;
      if (offset + m.length < whole.length && whole[offset + m.length] === "/") return m;
      const n = Number(m.replace(",", ".")) * ratio;
      if (!Number.isFinite(n)) return m;
      return formatQty(Math.round(n * 4) / 4, locale);
    });
    return s;
  }

  function matchesHard(recipe, f) {
    if (f.diet && !recipe.diets.includes(f.diet)) return false;
    if (f.meal && !recipe.meals.includes(f.meal)) return false;
    if (f.time) {
      const limit = Number(f.time);
      if (limit === 90) {
        if (recipe.maxTime <= 60) return false;
      } else if (recipe.maxTime > limit) {
        return false;
      }
    }
    return true;
  }

  function scoreDemo(recipe, f) {
    let score = 0;
    for (const ing of state.ingredients) {
      if (recipe.keys.some((k) => tokenMatch(ing, k))) score += 3;
    }
    if (f.meal && recipe.meals.includes(f.meal)) score += 2;
    if (f.diet && recipe.diets.includes(f.diet)) score += 2;
    if (f.time) {
      const limit = Number(f.time);
      if (limit === 90) {
        if (recipe.maxTime > 60) score += 2;
        else score -= 1;
      } else if (recipe.maxTime <= limit) {
        score += 2;
      } else {
        score -= 2;
      }
    }
    return score;
  }

  function demoPool() {
    const f = filters();
    const hard = DEMO_RECIPES.filter((r) => matchesHard(r, f));
    if (hard.length) {
      return {
        pool: hard.slice().sort((a, b) => scoreDemo(b, f) - scoreDemo(a, f)),
        closest: false,
      };
    }
    let soft = DEMO_RECIPES.slice().sort((a, b) => scoreDemo(b, f) - scoreDemo(a, f));
    if (f.diet) {
      const dietOk = soft.filter((r) => r.diets.includes(f.diet));
      if (dietOk.length) soft = dietOk;
    }
    return { pool: soft, closest: true };
  }

  function localizeDemo(recipe, f) {
    const loc = recipe[state.lang] || recipe.pt;
    const servings = f.servings || 2;
    const ingredients = (recipe.ingredients || []).map((item) => ({
      name: (item.name && (item.name[state.lang] || item.name.pt)) || item.name || "",
      amount: formatAmount(item.qty, item.unit, servings, 2, state.lang),
      have: userHas(item.keys),
    }));
    const meal = f.meal && recipe.meals.includes(f.meal) ? f.meal : recipe.meals[0];
    return {
      id: recipe.id,
      demoId: recipe.id,
      title: loc.title,
      description: loc.description,
      time: recipe.maxTime,
      servings,
      difficulty: loc.difficulty,
      meal,
      ingredients,
      steps: loc.steps.slice(),
      tips: loc.tips.slice(),
      nutrition: { ...loc.nutrition },
      source: "demo",
      lang: state.lang,
      closest: false,
    };
  }

  function pickDemoRecipe(asVariation) {
    const f = filters();
    const { pool, closest } = demoPool();
    if (!pool.length) return localizeDemo(DEMO_RECIPES[0], f);
    const currentId = state.recipe && (state.recipe.demoId || state.recipe.id);
    let choice = pool[0];
    if (asVariation) {
      const others = pool.filter((r) => r.id !== currentId);
      if (!others.length) {
        toast(t("onlyOneDemo"));
        return null;
      }
      const idx = pool.findIndex((r) => r.id === currentId);
      const next = idx >= 0 ? pool[(idx + 1) % pool.length] : others[0];
      choice = next.id === currentId ? others[0] : next;
    }
    const recipe = localizeDemo(choice, f);
    recipe.closest = closest;
    return recipe;
  }



  async function generateRecipe(asVariation) {
    hideFormError();
    if (!state.ingredients.length) {
      showFormError(t("needIngredient"));
      return;
    }
    if (asVariation) state.variationNonce += 1;
    else {
      state.variationNonce = 0;
      state.lastDemoIds = [];
    }
    if (asVariation && state.demoMode) {
      const { pool } = demoPool();
      const currentId = state.recipe && (state.recipe.demoId || state.recipe.id);
      if (pool.filter((r) => r.id !== currentId).length === 0) {
        toast(t("onlyOneDemo"));
        return;
      }
    }
    const previousId = state.recipe && (state.recipe.demoId || state.recipe.id);
    state.activeTab = "ingredients";
    setLoading(true);
    await wait(asVariation ? 450 : 550);
    try {
      const recipe = state.demoMode
        ? pickDemoRecipe(asVariation)
        : await requestOpenAI(asVariation);
      if (!recipe) {
        if (state.recipe) renderRecipe(state.recipe, state.activeTab);
        else renderEmpty();
        return;
      }
      if ((recipe.demoId || recipe.id) !== previousId) state.checkedSteps = [];
      state.recipe = recipe;
      renderRecipe(recipe, "ingredients");
    } catch (err) {
      showFormError(err.message || t("genericError"));
      if (!state.recipe) renderEmpty();
      else renderRecipe(state.recipe, state.activeTab);
    } finally {
      setLoading(false);
    }
  }

  async function requestOpenAI(asVariation) {
    const apiKey = getApiKey();
    if (!apiKey) throw new Error(t("needKey"));
    const f = filters();
    const langName = state.lang === "en" ? "English" : "Brazilian Portuguese";
    const mealLabel = f.meal ? (t("mealNames")[f.meal] || f.meal) : (state.lang === "en" ? "any meal" : "qualquer refeição");
    const dietLabel = f.diet ? (t("diets").find((d) => d.value === f.diet) || {}).label : (state.lang === "en" ? "no restriction" : "sem restrição");
    const timeLabel = f.time
      ? (t("times").find((o) => o.value === f.time) || {}).label
      : (state.lang === "en" ? "any time" : "tempo livre");

    const system = `You are a professional home chef and recipe developer.
Return ONLY a JSON object (no markdown) with this exact shape:
{
  "title": string,
  "description": string,
  "time": number,
  "servings": number,
  "difficulty": string,
  "meal": string,
  "ingredients": [{"name": string, "amount": string, "have": boolean}],
  "steps": [string],
  "tips": [string],
  "nutrition": {"calories": number, "protein": string, "carbs": string, "fat": string}
}
Rules:
- Write every user-facing string in ${langName}.
- Prefer recipes that use the ingredients the user already has. Mark "have": true when the ingredient matches one they listed (fuzzy match is fine), otherwise false.
- Keep the recipe practical for a home kitchen.
- Strictly honor the dietary restriction when one is provided.
- Adjust quantities to the requested servings.
- time is total minutes as a number.
- difficulty is a short word (fácil/médio/difícil or easy/medium/hard, matching the language).
- nutrition is approximate, per serving.
- steps should be clear, in order, without numbering prefixes.
- Give 3 useful tips.
- Do not invent unsafe food combinations. Do not claim medical benefits.`;

    const user = `Ingredients I have: ${state.ingredients.join(", ")}.
Meal type: ${mealLabel}.
Time available: ${timeLabel}.
Dietary restriction: ${dietLabel}.
Servings: ${f.servings}.
${asVariation ? "Give a distinctly different variation from a typical first idea, still using these ingredients." : "Create one excellent recipe."}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    let response;
    try {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          temperature: asVariation ? 0.95 : 0.7,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
        signal: controller.signal,
      });
    } catch (err) {
      if (err && err.name === "AbortError") throw new Error(t("timeout"));
      throw new Error(t("networkError"));
    } finally {
      clearTimeout(timer);
    }

    if (response.status === 401 || response.status === 403) throw new Error(t("invalidKey"));
    if (response.status === 429) throw new Error(t("rateLimit"));
    if (response.status === 404) throw new Error(t("modelError"));
    if (!response.ok) {
      if (response.status >= 500) throw new Error(t("serverError"));
      throw new Error(t("genericError"));
    }

    const data = await response.json();
    const content = data && data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : "";
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error(t("badResponse"));
    }
    return normalizeRecipe(parsed, f);
  }

  function normalizeRecipe(raw, f) {
    if (!raw || typeof raw !== "object") throw new Error(t("badResponse"));
    const ingredients = Array.isArray(raw.ingredients)
      ? raw.ingredients.map((item) => {
          if (typeof item === "string") return { name: item, amount: "", have: userHas(item) };
          const name = String(item.name || item.ingredient || "");
          return {
            name,
            amount: String(item.amount || item.quantity || ""),
            have: typeof item.have === "boolean" ? item.have : userHas(name),
          };
        }).filter((i) => i.name)
      : [];
    const steps = Array.isArray(raw.steps) ? raw.steps.map((s) => String(s)).filter(Boolean) : [];
    const tips = Array.isArray(raw.tips) ? raw.tips.map((s) => String(s)).filter(Boolean) : [];
    if (!raw.title || !ingredients.length || !steps.length) throw new Error(t("badResponse"));
    const nutrition = raw.nutrition && typeof raw.nutrition === "object" ? raw.nutrition : {};
    return {
      id: "ai-" + Date.now(),
      title: String(raw.title),
      description: String(raw.description || ""),
      time: Number(raw.time) || 30,
      servings: Number(raw.servings) || f.servings,
      difficulty: String(raw.difficulty || ""),
      meal: String(raw.meal || f.meal || ""),
      ingredients,
      steps,
      tips,
      nutrition: {
        calories: nutrition.calories ?? "—",
        protein: nutrition.protein || "—",
        carbs: nutrition.carbs || "—",
        fat: nutrition.fat || "—",
      },
      source: "openai",
      lang: state.lang,
    };
  }

  function mealLabelOf(recipe) {
    if (!recipe.meal) return "";
    return t("mealNames")[recipe.meal] || recipe.meal;
  }

  function recipeSignature(recipe) {
    const demoId = recipe && (recipe.demoId || (recipe.source === "demo" ? recipe.id : null));
    if (demoId) return "demo:" + demoId;
    return (recipe.title + "|" + (recipe.ingredients || []).map((i) => i.name).join(",")).toLowerCase();
  }

  function hydrateFavorite(fav) {
    const demoId = fav && (fav.demoId || (fav.source === "demo" ? fav.id : null));
    if (!demoId) return fav;
    const raw = DEMO_RECIPES.find((r) => r.id === demoId);
    if (!raw) return fav;
    const rec = localizeDemo(raw, { meal: fav.meal || "", time: "", diet: "", servings: fav.servings || 2 });
    rec.closest = fav.closest;
    rec.savedAt = fav.savedAt;
    return rec;
  }

  function isFavorite(recipe) {
    if (!recipe) return false;
    const sig = recipeSignature(recipe);
    return state.favorites.some((f) => recipeSignature(f) === sig);
  }

  function renderRecipe(recipe, tab) {
    const result = $("#result");
    result.hidden = false;
    result.removeAttribute("aria-busy");
    const active = tab || state.activeTab || "ingredients";
    state.activeTab = active;
    const meal = mealLabelOf(recipe);
    const n = recipe.nutrition || {};
    const have = recipe.ingredients.filter((i) => i.have);
    const need = recipe.ingredients.filter((i) => !i.have);
    const fav = isFavorite(recipe);
    const tabs = [
      { id: "ingredients", label: t("ingredients") },
      { id: "steps", label: t("stepsTab") },
      { id: "tips", label: t("tips") },
      { id: "nutrition", label: t("nutritionTab") },
    ];

    const ingCol = (items, title, intro, empty) => `
      <div>
        <h3 class="pn-split__col-title">${escapeHtml(title)}</h3>
        ${intro && items.length ? `<p class="field-help">${escapeHtml(intro)}</p>` : ""}
        ${items.length ? `<ul class="pn-ingredient-list">${items.map((ing) => `
          <li class="pn-ingredient-list__item">
            <span>${escapeHtml(ing.name)}</span>
            ${ing.amount ? `<span class="ing-amount">${escapeHtml(ing.amount)}</span>` : ""}
          </li>`).join("")}</ul>` : `<p class="field-help">${escapeHtml(empty)}</p>`}
      </div>
    `;

    result.innerHTML = `
      <article class="card recipe">
        <header class="recipe-hero">
          <div class="recipe-kicker">
            ${meal ? `<span class="tag">${escapeHtml(meal)}</span>` : ""}
            <span class="tag tag-warm">${escapeHtml(recipe.source === "demo" ? t("demoOn") : "OpenAI")}</span>
          </div>
          <h2>${escapeHtml(recipe.title)}</h2>
          <p class="recipe-desc">${escapeHtml(recipe.description)}</p>
          <div class="meta-row">
            <div class="meta"><span>${escapeHtml(t("timeLabel"))}</span><strong>${escapeHtml(String(recipe.time))} ${escapeHtml(t("minutes"))}</strong></div>
            <div class="meta"><span>${escapeHtml(t("servingsLabel"))}</span><strong>${escapeHtml(String(recipe.servings))}</strong></div>
            <div class="meta"><span>${escapeHtml(t("difficulty"))}</span><strong>${escapeHtml(recipe.difficulty || "—")}</strong></div>
            <div class="meta"><span>${escapeHtml(t("ingredients"))}</span><strong>${recipe.ingredients.length}</strong></div>
          </div>
          ${recipe.source === "demo" ? `<p class="pn-recipe__demo-note">${escapeHtml(t("demoNote"))}</p>` : ""}
          ${recipe.closest ? `<p class="pn-recipe__demo-note">${escapeHtml(t("closestDemo"))}</p>` : ""}
          ${recipe.source !== "demo" && recipe.lang && recipe.lang !== state.lang ? `<p class="pn-recipe__demo-note">${escapeHtml(recipe.lang === "en" ? t("recipeLangEn") : t("recipeLangPt"))}</p>` : ""}
        </header>
        <div class="recipe-body">
          <div class="pn-tabs">
            <div class="pn-tabs__list" role="tablist">
              ${tabs.map((tb) => `
                <button type="button" class="pn-tabs__tab" role="tab" id="tab-${tb.id}"
                  aria-controls="panel-${tb.id}" aria-selected="${active === tb.id ? "true" : "false"}"
                  tabindex="${active === tb.id ? "0" : "-1"}">${escapeHtml(tb.label)}</button>
              `).join("")}
            </div>
            <div class="pn-tabs__panel" role="tabpanel" id="panel-ingredients" aria-labelledby="tab-ingredients" ${active === "ingredients" ? "" : "hidden"}>
              <div class="pn-split">
                <div class="pn-split__col pn-split__col--have">${ingCol(have, t("have"), t("haveIntro"), "")}</div>
                <div class="pn-split__col pn-split__col--need">${ingCol(need, t("need"), "", t("needEmpty"))}</div>
              </div>
            </div>
            <div class="pn-tabs__panel" role="tabpanel" id="panel-steps" aria-labelledby="tab-steps" ${active === "steps" ? "" : "hidden"}>
              <div class="pn-steps">
                ${recipe.steps.map((step, i) => `
                  <label class="pn-step">
                    <input type="checkbox" class="pn-step__check" data-step="${i}" ${state.checkedSteps.includes(i) ? "checked" : ""} />
                    <span class="pn-step__body">${escapeHtml(step)}</span>
                  </label>
                `).join("")}
              </div>
            </div>
            <div class="pn-tabs__panel" role="tabpanel" id="panel-tips" aria-labelledby="tab-tips" ${active === "tips" ? "" : "hidden"}>
              ${recipe.tips && recipe.tips.length ? `<div class="pn-tips">${recipe.tips.map((tip) => `<p class="pn-tip">${escapeHtml(tip)}</p>`).join("")}</div>` : `<p class="field-help">—</p>`}
            </div>
            <div class="pn-tabs__panel" role="tabpanel" id="panel-nutrition" aria-labelledby="tab-nutrition" ${active === "nutrition" ? "" : "hidden"}>
              <ul class="pn-nutrition">
                <li class="pn-nutrition__item"><strong class="pn-nutrition__value">${escapeHtml(String(n.calories ?? "—"))}</strong><span class="pn-nutrition__label">${escapeHtml(t("calories"))}</span></li>
                <li class="pn-nutrition__item"><strong class="pn-nutrition__value">${escapeHtml(String(n.protein ?? "—"))}</strong><span class="pn-nutrition__label">${escapeHtml(t("protein"))}</span></li>
                <li class="pn-nutrition__item"><strong class="pn-nutrition__value">${escapeHtml(String(n.carbs ?? "—"))}</strong><span class="pn-nutrition__label">${escapeHtml(t("carbs"))}</span></li>
                <li class="pn-nutrition__item"><strong class="pn-nutrition__value">${escapeHtml(String(n.fat ?? "—"))}</strong><span class="pn-nutrition__label">${escapeHtml(t("fat"))}</span></li>
              </ul>
              <p class="pn-nutrition__disclaimer">${escapeHtml(t("nutritionDisclaimer"))}</p>
            </div>
          </div>
          <div class="recipe-actions">
            <button type="button" class="btn btn-primary" id="btn-variation"${recipe.source === "demo" && demoPool().pool.filter((r) => r.id !== (recipe.demoId || recipe.id)).length === 0 ? " disabled" : ""}>${escapeHtml(t("variation"))}</button>
            <button type="button" class="btn btn-secondary" id="btn-copy">${escapeHtml(t("copy"))}</button>
            <button type="button" class="btn btn-secondary" id="btn-save-fav">${escapeHtml(fav ? t("removeFavAction") : t("saveFav"))}</button>
            <button type="button" class="btn btn-ghost" id="btn-new">${escapeHtml(t("newRecipe"))}</button>
          </div>
        </div>
      </article>
    `;
    $("#btn-variation").addEventListener("click", () => generateRecipe(true));
    $("#btn-copy").addEventListener("click", copyRecipe);
    $("#btn-save-fav").addEventListener("click", toggleFavorite);
    $("#btn-new").addEventListener("click", resetToForm);
    $$(".pn-step__check", result).forEach((box) => {
      box.addEventListener("change", () => {
        const i = Number(box.dataset.step);
        if (box.checked) {
          if (!state.checkedSteps.includes(i)) state.checkedSteps.push(i);
        } else {
          state.checkedSteps = state.checkedSteps.filter((n) => n !== i);
        }
      });
    });
    const tablist = $(".pn-tabs__list", result);
    tablist.addEventListener("click", (e) => {
      const btn = e.target.closest("[role=tab]");
      if (!btn) return;
      setTab(btn.id.replace(/^tab-/, ""));
    });
    tablist.addEventListener("keydown", onTabKey);
    result.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    const heading = $("article.recipe h2", result);
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
    announce(t("readyAnnounce").replace("{title}", recipe.title));
  }

  function announce(msg) {
    const el = $("#live-status");
    if (!el) return;
    el.textContent = "";
    requestAnimationFrame(() => { el.textContent = msg; });
  }

  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function setDialogOpen(open) {
    document.body.style.overflow = open ? "hidden" : "";
    ["main", ".site-header", ".site-footer", ".bg-glow"].forEach((sel) => {
      $$(sel).forEach((el) => {
        if (open) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
    });
  }

  function setTab(id) {
    if (!state.recipe) return;
    state.activeTab = id;
    const root = $("#result");
    $$("[role=tab]", root).forEach((btn) => {
      const on = btn.id === "tab-" + id;
      btn.setAttribute("aria-selected", on ? "true" : "false");
      btn.tabIndex = on ? 0 : -1;
    });
    $$("[role=tabpanel]", root).forEach((panel) => {
      panel.hidden = panel.id !== "panel-" + id;
    });
    const active = $("#tab-" + id, root);
    if (active) active.focus();
  }

  function onTabKey(e) {
    const tabs = $$("[role=tab]", $("#result"));
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      setTab(tabs[next].id.replace(/^tab-/, ""));
    } else if (e.key === "Home") {
      e.preventDefault();
      setTab(tabs[0].id.replace(/^tab-/, ""));
    } else if (e.key === "End") {
      e.preventDefault();
      setTab(tabs[tabs.length - 1].id.replace(/^tab-/, ""));
    }
  }

  function resetToForm() {
    state.recipe = null;
    state.activeTab = "ingredients";
    renderEmpty();
    hideFormError();
    $("#ingredient-input").focus();
    window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
  }

  function recipeToText(recipe) {
    const meal = mealLabelOf(recipe);
    const n = recipe.nutrition || {};
    const have = recipe.ingredients.filter((i) => i.have);
    const need = recipe.ingredients.filter((i) => !i.have);
    const lines = [
      recipe.title,
      recipe.description,
      "",
      `${t("timeLabel")}: ${recipe.time} ${t("minutes")}`,
      `${t("servingsLabel")}: ${recipe.servings}`,
      `${t("difficulty")}: ${recipe.difficulty}`,
      meal ? `${t("meal")}: ${meal}` : "",
      "",
      t("have"),
      ...have.map((ing) => `- ${ing.name}${ing.amount ? " — " + ing.amount : ""}`),
      "",
      t("need"),
      ...(need.length ? need.map((ing) => `- ${ing.name}${ing.amount ? " — " + ing.amount : ""}`) : [t("needEmpty")]),
      "",
      t("steps"),
      ...recipe.steps.map((s, i) => `${i + 1}. ${s}`),
    ];
    if (recipe.tips && recipe.tips.length) {
      lines.push("", t("tips"), ...recipe.tips.map((s) => `- ${s}`));
    }
    lines.push(
      "",
      t("nutrition"),
      `${t("calories")}: ${n.calories ?? "—"}`,
      `${t("protein")}: ${n.protein ?? "—"}`,
      `${t("carbs")}: ${n.carbs ?? "—"}`,
      `${t("fat")}: ${n.fat ?? "—"}`,
      t("nutritionDisclaimer"),
    );
    return lines.filter((l) => l !== "").join("\n");
  }

  async function copyRecipe() {
    if (!state.recipe) return;
    try {
      await navigator.clipboard.writeText(recipeToText(state.recipe));
      toast(t("copied"));
    } catch {
      toast(t("copyFail"));
    }
  }

  function toggleFavorite() {
    if (!state.recipe) return;
    if (isFavorite(state.recipe)) {
      const sig = recipeSignature(state.recipe);
      state.favorites = state.favorites.filter((f) => recipeSignature(f) !== sig);
      try { persistFavorites(); } catch { toast(t("favSaveFail")); return; }
      updateFavCount();
      renderFavoritesList();
      const btn = $("#btn-save-fav");
      if (btn) btn.textContent = t("saveFav");
      toast(t("removedFav"));
      return;
    }
    const entry = { ...state.recipe, savedAt: Date.now(), id: state.recipe.id || ("fav-" + Date.now()) };
    state.favorites.unshift(entry);
    try { persistFavorites(); } catch { toast(t("favSaveFail")); return; }
    updateFavCount();
    renderFavoritesList();
    const btn = $("#btn-save-fav");
    if (btn) btn.textContent = t("removeFavAction");
    toast(t("savedFav"));
  }

  function persistFavorites() {
    localStorage.setItem(STORAGE.favs, JSON.stringify(state.favorites));
  }

  function updateFavCount() {
    const badge = $("#fav-count");
    const n = state.favorites.length;
    badge.hidden = n === 0;
    badge.textContent = String(n);
    const btn = $("#btn-favorites");
    if (btn) {
      btn.setAttribute("aria-label", n ? t("favoritesCount").replace("{n}", String(n)) : t("favorites"));
    }
  }

  function renderFavoritesList() {
    const list = $("#favorites-list");
    if (!state.favorites.length) {
      list.innerHTML = `<p class="fav-empty">${escapeHtml(t("favEmpty"))}</p>`;
      return;
    }
    list.innerHTML = state.favorites.map((fav, i) => {
      const display = hydrateFavorite(fav);
      return `
      <div class="fav-card">
        <div class="fav-card-top">
          <div>
            <h3>
              <button type="button" class="fav-open" data-open-fav="${i}">${escapeHtml(display.title)}</button>
            </h3>
            <p>${escapeHtml(String(display.time))} ${escapeHtml(t("minutes"))} · ${escapeHtml(String(display.servings))} ${escapeHtml(t("servingsLabel").toLowerCase())}</p>
          </div>
          <button type="button" class="fav-remove" data-remove-fav="${i}">${escapeHtml(t("removeFav"))}</button>
        </div>
      </div>`;
    }).join("");
  }

  function openFavorite(index) {
    const fav = hydrateFavorite(state.favorites[index]);
    if (!fav) return;
    state.recipe = fav;
    state.checkedSteps = [];
    closeFavorites({ restoreFocus: false });
    renderRecipe(fav, "ingredients");
  }

  function removeFavorite(index) {
    state.favorites.splice(index, 1);
    try { persistFavorites(); } catch { toast(t("favSaveFail")); return; }
    updateFavCount();
    renderFavoritesList();
    if (state.recipe) {
      const btn = $("#btn-save-fav");
      if (btn) btn.textContent = isFavorite(state.recipe) ? t("removeFavAction") : t("saveFav");
    }
    toast(t("removedFav"));
  }

  function trapFocus(container, event) {
    if (event.key !== "Tab") return;
    const nodes = $$("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])", container)
      .filter((el) => !el.hasAttribute("disabled") && !el.closest("[hidden]"));
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openFavorites() {
    state.lastTrigger = document.activeElement;
    $("#favorites-overlay").hidden = false;
    $("#favorites-drawer").hidden = false;
    setDialogOpen(true);
    renderFavoritesList();
    $("#close-favorites").focus();
  }

  function closeFavorites(opts) {
    const restore = !opts || opts.restoreFocus !== false;
    $("#favorites-overlay").hidden = true;
    $("#favorites-drawer").hidden = true;
    setDialogOpen(false);
    if (restore && state.lastTrigger && state.lastTrigger.focus) state.lastTrigger.focus();
  }

  function openSettings() {
    state.lastTrigger = document.activeElement;
    $("#settings-overlay").hidden = false;
    $("#settings-modal").hidden = false;
    setDialogOpen(true);
    $("#demo-toggle").checked = state.demoMode;
    $("#api-key-input").value = getApiKey();
    $("#api-key-input").type = "password";
    $("#toggle-key").textContent = t("showKey");
    $("#settings-feedback").hidden = true;
    const title = $("#settings-title");
    if (title) title.focus();
  }

  function closeSettings() {
    $("#settings-overlay").hidden = true;
    $("#settings-modal").hidden = true;
    setDialogOpen(false);
    if (state.lastTrigger && state.lastTrigger.focus) state.lastTrigger.focus();
  }

  function saveSettings() {
    state.demoMode = $("#demo-toggle").checked;
    localStorage.setItem(STORAGE.demo, state.demoMode ? "1" : "0");
    const key = $("#api-key-input").value.trim();
    if (key) localStorage.setItem(STORAGE.key, key);
    else localStorage.removeItem(STORAGE.key);
    updateModePill();
    const fb = $("#settings-feedback");
    fb.hidden = false;
    fb.textContent = key ? t("saved") : t("settingsSaved");
  }

  function clearKey() {
    localStorage.removeItem(STORAGE.key);
    $("#api-key-input").value = "";
    const fb = $("#settings-feedback");
    fb.hidden = false;
    fb.textContent = t("keyRemoved");
  }

  function setLang(lang) {
    state.lang = lang === "en" ? "en" : "pt";
    localStorage.setItem(STORAGE.lang, state.lang);
    if (state.recipe && (state.recipe.source === "demo" || state.recipe.demoId)) {
      const raw = DEMO_RECIPES.find((r) => r.id === (state.recipe.demoId || state.recipe.id));
      if (raw) {
        const closest = state.recipe.closest;
        const servings = state.recipe.servings || servingsValue();
        state.recipe = localizeDemo(raw, { ...filters(), servings, meal: state.recipe.meal || filters().meal });
        state.recipe.closest = closest;
      }
    }
    applyI18n();
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._id);
    toast._id = setTimeout(() => { el.hidden = true; }, 2200);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function resolveOgImages() {
    try {
      const abs = new URL("docs/og.png", document.location.href).href;
      $$("meta[property='og:image'], meta[name='twitter:image']").forEach((el) => {
        el.setAttribute("content", abs);
      });
    } catch { /* ignore */ }
  }

  function bind() {
    $("#ingredient-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("#ingredient-input");
      addIngredient(input.value);
      input.value = "";
      toggleIngredientHint(false);
      input.focus();
    });
    $("#ingredient-input").addEventListener("input", () => {
      const input = $("#ingredient-input");
      toggleIngredientHint(input.value.length >= INGREDIENT_MAX);
    });
    $("#ingredient-input").addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !$("#ingredient-input").value && state.ingredients.length) {
        removeIngredient(state.ingredients.length - 1);
      }
    });
    $("#ingredient-chips").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-remove]");
      if (!btn) return;
      removeIngredient(Number(btn.dataset.remove));
    });
    $("#suggestions").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-suggestion]");
      if (!btn) return;
      const name = btn.dataset.suggestion;
      if (state.ingredients.some((i) => tokenMatch(i, name))) {
        const idx = state.ingredients.findIndex((i) => tokenMatch(i, name));
        if (idx >= 0) removeIngredient(idx);
      } else {
        addIngredient(name);
      }
    });
    $("#btn-clear").addEventListener("click", clearIngredients);
    $("#servings-minus").addEventListener("click", () => {
      $("#filter-servings").value = String(Math.max(1, servingsValue() - 1));
      syncStepper();
    });
    $("#servings-plus").addEventListener("click", () => {
      $("#filter-servings").value = String(Math.min(8, servingsValue() + 1));
      syncStepper();
    });
    $("#filter-servings").addEventListener("change", syncStepper);
    bindSegmented($("#filter-meal"), "meal");
    bindSegmented($("#filter-time"), "time");
    bindSegmented($("#filter-diet"), "diet");
    $("#btn-generate").addEventListener("click", () => generateRecipe(false));
    $$(".lang-btn").forEach((btn) => btn.addEventListener("click", () => setLang(btn.dataset.lang)));
    $("#btn-theme").addEventListener("click", toggleTheme);
    $("#btn-favorites").addEventListener("click", openFavorites);
    $("#close-favorites").addEventListener("click", closeFavorites);
    $("#favorites-overlay").addEventListener("click", closeFavorites);
    $("#favorites-drawer").addEventListener("keydown", (e) => trapFocus($("#favorites-drawer"), e));
    const onOpenFav = (e) => {
      if (e.target.closest("[data-remove-fav]")) return null;
      const card = e.target.closest("[data-open-fav]");
      return card ? Number(card.dataset.openFav) : null;
    };
    $("#favorites-list").addEventListener("click", (e) => {
      const remove = e.target.closest("[data-remove-fav]");
      if (remove) {
        e.stopPropagation();
        removeFavorite(Number(remove.dataset.removeFav));
        return;
      }
      const i = onOpenFav(e);
      if (i !== null) openFavorite(i);
    });
    $("#favorites-list").addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (e.target.closest("[data-remove-fav]")) return;
      const i = onOpenFav(e);
      if (i === null) return;
      e.preventDefault();
      openFavorite(i);
    });
    $("#btn-settings").addEventListener("click", openSettings);
    $("#close-settings").addEventListener("click", closeSettings);
    $("#settings-overlay").addEventListener("click", closeSettings);
    $("#settings-modal").addEventListener("keydown", (e) => trapFocus($("#settings-modal"), e));
    const keyForm = $("#key-form");
    if (keyForm) {
      keyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        saveSettings();
      });
    }
    $("#save-settings").addEventListener("click", saveSettings);
    $("#clear-key").addEventListener("click", clearKey);
    $("#toggle-key").addEventListener("click", () => {
      const input = $("#api-key-input");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      $("#toggle-key").textContent = show ? t("hideKey") : t("showKey");
    });
    $("#demo-toggle").addEventListener("change", () => {
      state.demoMode = $("#demo-toggle").checked;
      localStorage.setItem(STORAGE.demo, state.demoMode ? "1" : "0");
      updateModePill();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("#settings-modal").hidden) closeSettings();
      if (!$("#favorites-drawer").hidden) closeFavorites();
    });
    $$(".brand").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
      });
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (!localStorage.getItem(STORAGE.theme)) syncThemeButton();
    });
  }

  loadState();
  bind();
  applyI18n();
  renderChips();
  syncStepper();
  $("#demo-toggle").checked = state.demoMode;
  const existingKey = getApiKey();
  if (existingKey) $("#api-key-input").value = existingKey;
  resolveOgImages();
  syncThemeButton();
})();
