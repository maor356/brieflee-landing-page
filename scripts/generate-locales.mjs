import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const CORE_PAGES = [
  'index.html',
  'legal-research.html',
  'workflows.html',
  'draft.html',
  'pricing.html',
  'about-us.html',
  'careers.html',
  'contact.html',
  'request-demo.html',
  'legal.html',
  'old-home.html'
];

const LOCALES = {
  en: { code: 'en', htmlLang: 'en' },
  'nl-be': { code: 'nl-be', htmlLang: 'nl-BE' },
  'fr-be': { code: 'fr-be', htmlLang: 'fr-BE' }
};

const PAGE_META = {
  'nl-be': {
    'index.html': {
      title: 'Brieflee',
      description:
        'Brieflee is de AI-juridische werkruimte die advocaten helpt sneller te onderzoeken, zaken met vertrouwen te analyseren en argumenten op te bouwen op basis van verifieerbare rechtspraak en wetgeving.'
    },
    'legal-research.html': {
      title: 'Brieflee - Juridisch Onderzoek',
      description:
        'Onderzoek Belgische rechtspraak en wetsartikelen met bron-onderbouwde antwoorden. Verifieer elke juridische stelling en bekijk de exacte passage in context.'
    },
    'workflows.html': {
      title: 'Brieflee - Werkstromen',
      description:
        'Analyseer juridische documenten via begeleide werkstromen voor issue spotting, samenvatting, vergelijking en redactie, met de advocaat altijd in controle.'
    },
    'draft.html': {
      title: 'Brieflee - Opstellen',
      description:
        'Stel sneller juridische documenten op met bron-onderbouwde voorstellen die je direct kunt redigeren en verfijnen.'
    },
    'pricing.html': {
      title: 'Brieflee - Prijzen',
      description: 'Ontdek de prijsplannen van Brieflee voor individuele advocaten, teams en kantoren.'
    },
    'about-us.html': {
      title: 'Brieflee - Over Ons',
      description: 'Ontdek het team en de missie achter Brieflee: juridische werkstromen slimmer en menselijker maken.'
    },
    'careers.html': {
      title: 'Carrières | Brieflee',
      description: 'Bouw mee aan de toekomst van juridisch werk. Bekijk openstaande functies bij Brieflee.'
    },
    'contact.html': {
      title: 'Contact — Brieflee',
      description: 'Neem contact op met Brieflee voor demo\'s, ondersteuning of vragen over onze AI-juridische werkruimte.'
    },
    'request-demo.html': {
      title: 'Vraag een Demo Aan | Brieflee',
      description:
        'Vraag een gepersonaliseerde demo aan van Brieflee\'s AI-juridische werkruimte voor onderzoek, analyse en opstellen.'
    },
    'legal.html': {
      title: 'Brieflee - Privacybeleid',
      description: 'Het privacybeleid van Brieflee legt uit hoe wij persoonsgegevens verzamelen, gebruiken en beschermen.'
    },
    'old-home.html': {
      title: 'Brieflee',
      description:
        'Brieflee is de AI-juridische werkruimte die advocaten helpt sneller te onderzoeken, analyseren en opstellen met verifieerbare bronnen.'
    }
  },
  'fr-be': {
    'index.html': {
      title: 'Brieflee',
      description:
        'Brieflee est l\'espace de travail juridique IA qui aide les avocats à rechercher plus vite, analyser leurs dossiers avec confiance et construire des arguments ancrés dans des sources vérifiables.'
    },
    'legal-research.html': {
      title: 'Brieflee - Recherche Juridique',
      description:
        'Recherchez la jurisprudence belge et les articles de loi avec des réponses sourcées. Vérifiez chaque affirmation et consultez le passage exact en contexte.'
    },
    'workflows.html': {
      title: 'Brieflee - Flux de Travail',
      description:
        'Analysez des documents juridiques via des flux de travail guidés pour l\'identification des enjeux, la synthèse, la comparaison et la rédaction.'
    },
    'draft.html': {
      title: 'Brieflee - Rédaction',
      description:
        'Rédigez plus rapidement des documents juridiques structurés et sourcés, puis modifiez-les directement dans Brieflee.'
    },
    'pricing.html': {
      title: 'Brieflee - Tarifs',
      description: 'Découvrez les offres tarifaires de Brieflee pour les avocats, équipes et cabinets.'
    },
    'about-us.html': {
      title: 'Brieflee - À Propos',
      description: 'Découvrez l\'équipe et la mission de Brieflee : moderniser les flux de travail juridiques.'
    },
    'careers.html': {
      title: 'Carrières | Brieflee',
      description: 'Rejoignez Brieflee et construisez le futur du travail juridique.'
    },
    'contact.html': {
      title: 'Contact — Brieflee',
      description:
        'Contactez Brieflee pour une démo, un support ou des questions sur notre espace de travail juridique IA.'
    },
    'request-demo.html': {
      title: 'Demander une Démo | Brieflee',
      description:
        'Demandez une démonstration personnalisée de Brieflee pour la recherche, l\'analyse et la rédaction juridiques.'
    },
    'legal.html': {
      title: 'Brieflee - Politique de Confidentialité',
      description:
        'La politique de confidentialité de Brieflee explique comment nous collectons, utilisons et protégeons les données personnelles.'
    },
    'old-home.html': {
      title: 'Brieflee',
      description:
        'Brieflee est l\'espace de travail juridique IA pour rechercher, analyser et rédiger avec des sources vérifiables.'
    }
  }
};

const TEXT_REPLACEMENTS = {
  'nl-be': [
    ['Welcome to Brieflee', 'Welkom bij Brieflee'],
    ['Built on sources,', 'Gebouwd op bronnen,'],
    ['not shortcuts.', 'niet op shortcuts.'],
    ['The AI-powered legal workspace for research, analysis, and drafting — grounded in real sources you can verify.', 'De AI-juridische werkruimte voor onderzoek, analyse en opstellen — gebaseerd op echte, verifieerbare bronnen.'],
    ['Search grounded law', 'Doorzoek onderbouwde rechtsbronnen'],
    ['Find relevant case law and articles of law, with sources you can inspect and verify.', 'Vind relevante rechtspraak en wetsartikelen, met bronnen die je kunt controleren en verifiëren.'],
    ['Reason across documents', 'Redeneer over documenten heen'],
    ['Analyze multiple files, identify weaknesses, and structure arguments using legal workflows.', 'Analyseer meerdere bestanden, identificeer zwakke punten en structureer argumenten met juridische werkstromen.'],
    ['Draft faster', 'Stel sneller op'],
    ['Generate structured, source-based drafts and refine them directly in Brieflee.', 'Genereer gestructureerde, brongebaseerde concepten en verfijn ze direct in Brieflee.'],
    ['Built for the way', 'Gebouwd voor de manier waarop'],
    ['actually work', 'echt werken'],
    ['Analyze faster', 'Analyseer sneller'],
    ['Empower your team to simplify case complexity. Brieflee transforms documents into insights, extracting facts and timelines to highlight what matters.', 'Geef je team de kracht om dossiercomplexiteit te vereenvoudigen. Brieflee zet documenten om in inzichten, met extractie van feiten en tijdlijnen die tonen wat echt telt.'],
    ['Research smarter', 'Onderzoek slimmer'],
    ['Go beyond manual search. Brieflee connects insights with relevant law, streamlining your workflow for better outcomes.', 'Ga verder dan manueel zoeken. Brieflee koppelt inzichten aan relevante rechtsbronnen en stroomlijnt je workflow voor betere resultaten.'],
    ['Argue stronger', 'Bouw sterkere argumenten'],
    ['Build structured, source-grounded arguments. Brieflee helps identify weaknesses, counterarguments, and supporting precedents.', 'Bouw gestructureerde argumenten op basis van bronnen. Brieflee helpt zwakke punten, tegenargumenten en ondersteunende precedenten te identificeren.'],
    ['Draft seamlessly', 'Stel naadloos op'],
    ['Transform insights into legal documents. Generate notices, briefs, and memos — accurate and editable. Deliver quality drafts faster while maintaining control.', 'Zet inzichten om in juridische documenten. Genereer kennisgevingen, conclusies en memo\'s — accuraat en bewerkbaar. Lever sneller kwaliteitsvolle concepten af met volledige controle.'],
    ['Explore product', 'Ontdek het product'],
    ['Clear boundaries for professional use.', 'Duidelijke grenzen voor professioneel gebruik.'],
    ['Built for confidential matters', 'Gebouwd voor vertrouwelijke dossiers'],
    ['Grounded in verifiable sources', 'Gebaseerd op verifieerbare bronnen'],
    ['You stay in control', 'Jij blijft in controle'],
    ['Not a black-box chatbot', 'Geen black-box chatbot'],
    ['Not a replacement for legal judgment', 'Geen vervanging voor juridisch oordeel'],
    ['Not trained on your client files', 'Niet getraind op je cliëntbestanden'],
    ['Flexible pricing that scales with you', 'Flexibele prijzen die met je meegroeien'],
    ['Choose a plan that fits your team\'s needs, from individual to enterprise.', 'Kies een plan dat past bij je team, van individueel tot ondernemingsniveau.'],
    ['Custom Offer', 'Maatwerk aanbod'],
    ['Get in touch', 'Neem contact op'],
    ['See why customers love using Brieflee', 'Ontdek waarom klanten graag met Brieflee werken'],
    ['Ready to work smarter?', 'Klaar om slimmer te werken?'],
    ['Join the legal teams already using Brieflee', 'Sluit je aan bij juridische teams die Brieflee al gebruiken'],
    ['Thank you! We\'ll be in touch soon.', 'Bedankt! We nemen snel contact met je op.'],
    ['Oops! Something went wrong. Please try again.', 'Oeps! Er ging iets mis. Probeer opnieuw.'],
    ['Brieflee\'s integrated legal workspace streamlines legal workflows and helps lawyers focus on higher-value, strategic work.', 'Brieflee\'s geïntegreerde juridische werkruimte stroomlijnt juridische werkstromen en helpt advocaten focussen op werk met hogere strategische waarde.'],
    ['Pages', 'Pagina\'s'],
    ['Home', 'Home'],
    ['Product', 'Product'],
    ['Customers', 'Klanten'],
    ['Security', 'Beveiliging'],
    ['Pricing', 'Prijzen'],
    ['About', 'Over ons'],
    ['Resources', 'Bronnen'],
    ['Company', 'Bedrijf'],
    ['Overview', 'Overzicht'],
    ['Analyze', 'Analyseren'],
    ['Argue', 'Argumenteren'],
    ['Draft', 'Opstellen'],
    ['Research', 'Onderzoek'],
    ['Status Page', 'Statuspagina'],
    ['Trust Center', 'Vertrouwenscentrum'],
    ['Careers', 'Carrières'],
    ['Contact us', 'Contacteer ons'],
    ['All rights reserved.', 'Alle rechten voorbehouden.'],
    ['By subscribing you agree to our', 'Door je in te schrijven ga je akkoord met ons'],
    ['Privacy Policy', 'Privacybeleid'],
    ['Thank you for subscribing!', 'Bedankt voor je inschrijving!'],
    ['Request a demo', 'Vraag een demo aan'],
    ['Search then hit enter', 'Zoek en druk op Enter'],
    ['Search…', 'Zoeken…'],
    ['Search', 'Zoeken'],
    ['Login', 'Inloggen'],
    ['Smarter research, built for litigation', 'Slimmer juridisch onderzoek, gebouwd voor procesvoering'],
    ['Legal workflows, built around real cases', 'Juridische werkstromen, opgebouwd rond echte dossiers'],
    ['Analyze and review legal documents through guided workflows — from issue extraction and red-flagging to summarization, comparison, proofreading, and translation — all while keeping legal judgment in your hands.', 'Analyseer en beoordeel juridische documenten via begeleide werkstromen — van issue-extractie en risico-identificatie tot samenvatting, vergelijking, nalezing en vertaling — terwijl het juridisch oordeel bij jou blijft.'],
    ['Analyze arguments and counter-arguments', 'Analyseer argumenten en tegenargumenten'],
    ['Use workflows to map arguments and counter-arguments across submissions, responses, and replies.', 'Gebruik werkstromen om argumenten en tegenargumenten in kaart te brengen over conclusies, antwoorden en replieken heen.'],
    ['Build chronological timelines from multiple documents', 'Bouw chronologische tijdlijnen vanuit meerdere documenten'],
    ['Automatically extract and organize events from different documents into a single chronological timeline.', 'Extraheer en organiseer automatisch gebeurtenissen uit verschillende documenten in één chronologische tijdlijn.'],
    ['Extract key information from legal documents', 'Extraheer kerninformatie uit juridische documenten'],
    ['Analyze documents to extract essential information such as parties involved, procedural posture, final outcome, and concise summaries — all presented in a structured, reviewable format.', 'Analyseer documenten om essentiële informatie te extraheren zoals betrokken partijen, procedurele stand van zaken, einduitkomst en beknopte samenvattingen — alles gepresenteerd in een gestructureerd, controleerbaar formaat.'],
    ['Workflows you can inspect, review, and refine', 'Werkstromen die je kunt inspecteren, beoordelen en verfijnen'],
    ['Each workflow follows a clear sequence: reading documents, extracting information, structuring analysis, and presenting results in a reviewable format.', 'Elke werkstroom volgt een duidelijke volgorde: documenten lezen, informatie extraheren, analyse structureren en resultaten presenteren in een controleerbaar formaat.'],
    ['Outputs are never final decisions. They are structured working material that you can inspect, adjust, export, or discard — keeping legal judgment fully with the lawyer.', 'Outputs zijn nooit definitieve beslissingen. Het zijn gestructureerde werkmaterialen die je kunt controleren, aanpassen, exporteren of verwerpen — waarbij het juridisch oordeel volledig bij de advocaat blijft.'],
    ['The Others', 'Andere tools'],
    ['See Brieflee in action', 'Zie Brieflee in actie'],
    ['Book a personalized walkthrough and discover how Brieflee helps litigation teams draft, research, and analyze cases with structure and control.', 'Boek een gepersonaliseerde walkthrough en ontdek hoe Brieflee litigationteams helpt om gestructureerd te onderzoeken, analyseren en opstellen.'],
    ['We\'ll walk you through how Brieflee can fit your practice — research workflows, source integrations, and team setup. No commitment, no generic sales deck.', 'We nemen je mee in hoe Brieflee past binnen jouw praktijk — onderzoekswerkstromen, bronintegraties en teamopzet. Geen verplichting, geen generieke verkooppresentatie.'],
    ['Let\'s connect', 'Laten we kennismaken'],
    ['The future of litigation workflows', 'De toekomst van proceswerkstromen'],
    ['Maximize your billable hours', 'Maximaliseer je factureerbare uren'],
    ['Send us a message', 'Stuur ons een bericht'],
    ['First name', 'Voornaam'],
    ['Last name', 'Achternaam'],
    ['Your message', 'Jouw bericht'],
    ['Tell us how we can help...', 'Vertel ons hoe we kunnen helpen...'],
    ['By submitting this form, you agree to our', 'Door dit formulier in te dienen ga je akkoord met ons'],
    ['Send message', 'Verstuur bericht'],
    ['Thank you! Your submission has been received!', 'Bedankt! Je inzending is goed ontvangen.'],
    ['Oops! Something went wrong while submitting the form.', 'Oeps! Er ging iets mis bij het verzenden van het formulier.'],
    ['About us', 'Over ons'],
    ['Building legal intelligence', 'Juridische intelligentie bouwen'],
    ['founded by lawyers, built for the realities of practice', 'opgericht door advocaten, gebouwd voor de realiteit van de praktijk'],
    ['Why Brieflee exists', 'Waarom Brieflee bestaat'],
    ['The story so far.', 'Het verhaal tot nu toe.'],
    ['Last updated: 13 February 2026', 'Laatst bijgewerkt: 13 februari 2026'],
    ['The fast way to an expensive-looking site', 'De snelle weg naar een premium ogende site'],
    ['Verify every legal statement.', 'Verifieer elke juridische stelling.'],
    ['Draft with sources attached.', 'Stel op met gekoppelde bronnen.'],
    ['Keep full professional control.', 'Behoud volledige professionele controle.'],
    ['Find relevant case law.', 'Vind relevante rechtspraak.'],
    ['Workflows', 'Werkstromen'],
    ['Essential tools for solo practitioners and small teams.', 'Essentiële tools voor solo-advocaten en kleine teams.'],
    ['What\'s included?', 'Wat is inbegrepen?'],
    ['What’s included?', 'Wat is inbegrepen?'],
    ['Document analysis workflows', 'Werkstromen voor documentanalyse'],
    ['Unlimited access and priority support for growing firms.', 'Onbeperkte toegang en prioritaire ondersteuning voor groeiende kantoren.'],
    ['Everything in Basic', 'Alles uit Basic'],
    ['Unlimited workflows &amp; drafting', 'Onbeperkte werkstromen &amp; opstellen'],
    ['Priority support line', 'Prioritaire supportlijn'],
    ['Early access to new features', 'Vroege toegang tot nieuwe functies'],
    ['Most popular', 'Populairst'],
    ['The drafting workflows have transformed how we prepare briefs and memoranda for our clients.', 'De opstel-werkstromen hebben veranderd hoe wij conclusies en memo\'s voor onze cliënten voorbereiden.'],
    ['Brieflee is essential for modern legal practice. The AI-powered workflows save us hours every week.', 'Brieflee is essentieel voor moderne juridische praktijk. De AI-gestuurde werkstromen besparen ons elke week uren.'],
    ['Legal Research', 'Juridisch onderzoek'],
    ['Launched workflows — analyse, review, and red-flag', 'Werkstromen gelanceerd — analyseren, beoordelen en risico\'s markeren'],
    ['Launched Draft — automated legal conclusions', 'Draft gelanceerd — geautomatiseerde juridische conclusies'],
    ['Brieflee was founded', 'Brieflee werd opgericht'],
    ['First prototype launched for legal research', 'Eerste prototype gelanceerd voor juridisch onderzoek'],
    ['Integrated the majority of publicly available Belgian case law', 'Integratie van het merendeel van publiek beschikbare Belgische rechtspraak'],
    ['Integrated all Belgian legislation and statutory articles', 'Integratie van alle Belgische wetgeving en wettelijke artikelen'],
    ['Introduced a new legal ontology to improve search and drafting accuracy', 'Nieuwe juridische ontologie geïntroduceerd om zoek- en opstelnauwkeurigheid te verbeteren'],
    ['Brieflee was born out of direct experience with the realities of legal work.', 'Brieflee is ontstaan uit directe ervaring met de realiteit van juridisch werk.'],
    ['Our CEO began his career as a lawyer and, by the age of 26, experienced a severe burnout caused by the pace, pressure, and inefficiencies of day-to-day legal practice. The issue wasn’t a lack of effort or ambition, it was a system that demanded more hours instead of better tools.', 'Onze CEO begon zijn carrière als advocaat en kreeg op 26-jarige leeftijd een ernstige burn-out door het tempo, de druk en de inefficiënties van de dagelijkse juridische praktijk. Het probleem was geen gebrek aan inzet of ambitie, maar een systeem dat meer uren vroeg in plaats van betere hulpmiddelen.'],
    ['Legal professionals are expected to process vast amounts of information, reason precisely under time pressure, and deliver flawless results, often with technology that hasn’t meaningfully evolved in decades.', 'Van juridische professionals wordt verwacht dat ze enorme hoeveelheden informatie verwerken, precies redeneren onder tijdsdruk en foutloze resultaten leveren, vaak met technologie die al decennia nauwelijks betekenisvol is geëvolueerd.'],
    ['That experience became the catalyst for Brieflee.', 'Die ervaring werd de katalysator voor Brieflee.'],
    ['Instead of accepting burnout as “part of the job,” we set out to build legal infrastructure that reduces cognitive overload, surfaces relevant insight faster, and supports how lawyers actually think and work.', 'In plaats van burn-out te aanvaarden als "onderdeel van het werk", besloten we juridische infrastructuur te bouwen die cognitieve overbelasting vermindert, relevante inzichten sneller naar boven haalt en ondersteunt hoe advocaten echt denken en werken.'],
    ['Key moments in our ongoing mission to free lawyers from unnecessary friction', 'Belangrijke momenten in onze voortdurende missie om advocaten te bevrijden van onnodige frictie'],
    ['Brieflee is not about replacing legal judgment. It’s about giving lawyers the clarity, structure, and confidence to do their best work, without sacrificing their health in the process.', 'Brieflee draait niet om het vervangen van juridisch oordeel. Het gaat erom advocaten de helderheid, structuur en het vertrouwen te geven om hun beste werk te leveren, zonder daarbij hun gezondheid op te offeren.'],
    ['March 2025', 'Maart 2025'],
    ['May 2025', 'Mei 2025'],
    ['September 2025', 'September 2025'],
    ['November 2025', 'November 2025'],
    ['January 2026', 'Januari 2026'],
    ['February 2026', 'Februari 2026'],
    ['Future', 'Toekomst'],
    ['More goodness', 'Meer moois'],
    ['What is Brieflee?', 'Wat is Brieflee?'],
    ['Brieflee is a legal research and drafting platform that helps lawyers search case law, analyze documents, and draft legal outputs with verifiable sources.', 'Brieflee is een platform voor juridisch onderzoek en opstellen dat advocaten helpt rechtspraak te doorzoeken, documenten te analyseren en juridische output op te stellen met verifieerbare bronnen.'],
    ['What can I do with Brieflee?', 'Wat kan ik met Brieflee doen?'],
    ['You can use Brieflee to:', 'Je kunt Brieflee gebruiken om:'],
    ['- Search Belgian and EU case law and articles of law using both keyword search and natural language questions', '- Belgische en EU-rechtspraak en wetsartikelen te doorzoeken met zowel zoekwoorden als vragen in natuurlijke taal'],
    ['- Verify legal answers with citations and jump to the exact source text', '- Juridische antwoorden te verifiëren met citaten en direct naar de exacte brontekst te springen'],
    ['- Upload your own documents to analyze them in context', '- Je eigen documenten te uploaden en in context te analyseren'],
    ['- Identify legal issues, weaknesses, and counter-arguments', '- Juridische kwesties, zwaktes en tegenargumenten te identificeren'],
    ['- Structure timelines and key facts across multiple documents', '- Tijdlijnen en kernfeiten over meerdere documenten te structureren'],
    ['- Draft legal documents and conclusions that you can edit and refine', '- Juridische documenten en conclusies op te stellen die je kunt bewerken en verfijnen'],
    ['Brieflee supports legal research, analysis, and drafting, while keeping the lawyer in control.', 'Brieflee ondersteunt juridisch onderzoek, analyse en opstellen, terwijl de advocaat de controle behoudt.'],
    ['Who is Brieflee for?', 'Voor wie is Brieflee?'],
    ['Brieflee is designed for lawyers and legal professionals who need reliable legal research, source-backed answers, and drafting support for real cases.', 'Brieflee is ontworpen voor advocaten en juridische professionals die betrouwbaar juridisch onderzoek, brononderbouwde antwoorden en ondersteuning bij opstellen voor echte dossiers nodig hebben.'],
    ['How is Brieflee different from a general AI chatbot?', 'Hoe verschilt Brieflee van een algemene AI-chatbot?'],
    ['Brieflee is purpose-built for legal work — not a general-purpose chatbot. Every output is grounded in case law, statutes, and verified legal sources. You can inspect each citation, view the full source text, and verify the reasoning before relying on it.', 'Brieflee is speciaal gebouwd voor juridisch werk — geen algemene chatbot. Elke output is gebaseerd op rechtspraak, wetgeving en geverifieerde juridische bronnen. Je kunt elk citaat controleren, de volledige brontekst bekijken en de redenering verifiëren voordat je erop vertrouwt.'],
    ['Can I upload my own documents?', 'Kan ik mijn eigen documenten uploaden?'],
    ['Yes. You can upload contracts, pleadings, judgments, and other legal documents to analyze them in context. Brieflee can extract timelines, identify issues, and generate draft outputs grounded in your files.', 'Ja. Je kunt contracten, conclusies, vonnissen en andere juridische documenten uploaden om ze in context te analyseren. Brieflee kan tijdlijnen extraheren, kwesties identificeren en conceptoutput genereren op basis van je bestanden.'],
    ['Can I verify where an answer comes from?', 'Kan ik verifiëren waar een antwoord vandaan komt?'],
    ['Yes. Brieflee shows citations and allows you to view the exact passage in the source document (“view in full text”) behind each legal statement.', 'Ja. Brieflee toont citaten en laat je de exacte passage in het brondocument ("bekijk in volledige tekst") achter elke juridische stelling bekijken.'],
    ['Does Brieflee replace legal judgment or advice?', 'Vervangt Brieflee juridisch oordeel of advies?'],
    ['No. Brieflee is a tool that supports research, analysis, and drafting. The lawyer always remains in control — all legal judgment and final responsibility stay with you.', 'Nee. Brieflee is een tool die onderzoek, analyse en opstellen ondersteunt. De advocaat blijft altijd in controle — alle juridische beoordeling en eindverantwoordelijkheid blijven bij jou.'],
    ['Is my client data used to train AI models?', 'Worden mijn cliëntgegevens gebruikt om AI-modellen te trainen?'],
    ['No. Your documents, queries, and outputs are never used to train any AI model — not ours, and not any third party&rsquo;s.', 'Nee. Je documenten, zoekopdrachten en output worden nooit gebruikt om enig AI-model te trainen — niet het onze en ook niet dat van derden.'],
    ['Where is my data hosted?', 'Waar worden mijn gegevens gehost?'],
    ['All data is hosted in the EU (AWS, Paris region) and encrypted at rest and in transit. AI capabilities are delivered through Azure OpenAI, with no data shared outside your secure environment.', 'Alle gegevens worden in de EU gehost (AWS, regio Parijs) en versleuteld in rust en tijdens transport. AI-functionaliteit wordt geleverd via Azure OpenAI, zonder gegevensdeling buiten je beveiligde omgeving.'],
    ['Draft litigation documents with structure and control.', 'Stel procesdocumenten op met structuur en controle.'],
    ['Draft with full case context', 'Stel op met volledige dossiercontext'],
    ['Draft from a complete case timeline', 'Stel op vanuit een volledige dossiertijdlijn'],
    ['Research is now direct. Brieflee links case facts to relevant law and doctrine instantly, ensuring accuracy and saving hours of work.', 'Onderzoek verloopt nu direct. Brieflee koppelt dossierfeiten meteen aan relevante wetgeving en doctrine, voor meer nauwkeurigheid en uren tijdswinst.'],
    ['98% Satisfaction from over 600 verified reviews.', '98% tevredenheid op basis van meer dan 600 geverifieerde beoordelingen.'],
    ['BZ Trade BV (&ldquo;BZ Trade&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), a Belgian limited liability company with its registered seat at Charlottalei 58, 2018 Antwerp, operates the online platform Brieflee.be (the &ldquo;Service&rdquo;). BZ Trade acts as Data Controller for the personal data described in this policy. Contact us at support@brieflee.be.', 'BZ Trade BV (&ldquo;BZ Trade&rdquo;, &ldquo;wij&rdquo;, &ldquo;ons&rdquo;), een Belgische besloten vennootschap met maatschappelijke zetel te Charlottalei 58, 2018 Antwerpen, beheert het online platform Brieflee.be (de &ldquo;Dienst&rdquo;). BZ Trade treedt op als verwerkingsverantwoordelijke voor de persoonsgegevens die in dit beleid worden beschreven. Contacteer ons via support@brieflee.be.'],
    ['Built by experienced founders who understand legal work, and are serious about improving it.', 'Gebouwd door ervaren oprichters die juridisch werk begrijpen en het echt willen verbeteren.'],
    ['Designed for legal work that involves client confidentiality and professional secrecy.', 'Ontworpen voor juridisch werk met cliëntvertrouwelijkheid en beroepsgeheim.'],
    ['Every legal statement is linked to real case law or statutory sources you can inspect.', 'Elke juridische stelling is gekoppeld aan echte rechtspraak of wetsbronnen die je kunt controleren.'],
    ['Brieflee assists with preparation and drafting, final judgment remains with the lawyer.', 'Brieflee ondersteunt voorbereiding en opstellen; het finale oordeel blijft bij de advocaat.'],
    ['Legal outputs are transparent and traceable, not opaque AI-generated text.', 'Juridische output is transparant en traceerbaar, geen ondoorzichtige AI-gegenereerde tekst.'],
    ['Brieflee supports legal reasoning but does not make legal decisions.', 'Brieflee ondersteunt juridische redenering maar neemt geen juridische beslissingen.'],
    ['Customer documents and inputs are not used to train public or shared AI models.', 'Klantdocumenten en input worden niet gebruikt om publieke of gedeelde AI-modellen te trainen.'],
    ['Hello 👋 I’m Maor', 'Hallo 👋 Ik ben Maor'],
    ['Let me know if you have any questions about Brieflee.', 'Laat gerust weten als je vragen hebt over Brieflee.'],
    ['Legal work depends on accuracy, sources, and professional judgment.', 'Juridisch werk draait om nauwkeurigheid, bronnen en professioneel oordeel.'],
    ['Brieflee is built to support that, not replace it.', 'Brieflee is gebouwd om dat te ondersteunen, niet te vervangen.'],
    ['Built by founders who have worked closely with lawyers and legal teams.', 'Gebouwd door oprichters die nauw hebben samengewerkt met advocaten en juridische teams.'],
    ['Legal research & case law', 'Juridisch onderzoek & rechtspraak'],
    ['AI-powered drafting', 'AI-ondersteund opstellen'],
    ['Onboarding & email support', 'Onboarding & e-mailondersteuning'],
    ['Tailored solutions for firms with six or more users.', 'Maatwerkoplossingen voor kantoren met zes of meer gebruikers.'],
    ['Everything in Growth', 'Alles uit Growth'],
    ['Dedicated account manager', 'Toegewijde accountmanager'],
    ['API access & custom integrations', 'API-toegang & maatwerkintegraties'],
    ['Team management & admin controls', 'Teambeheer & admincontroles'],
    ['Brieflee cut our legal research time in half. We find relevant case law faster than ever before.', 'Brieflee heeft onze tijd voor juridisch onderzoek gehalveerd. We vinden relevante rechtspraak sneller dan ooit tevoren.'],
    ['Brieflee has been instrumental in streamlining our document analysis and surfacing insights we would have missed.', 'Brieflee heeft een sleutelrol gespeeld in het stroomlijnen van onze documentanalyse en het zichtbaar maken van inzichten die we anders hadden gemist.'],
    ['The source verification feature gives us confidence that every citation is accurate and traceable.', 'De bronverificatiefunctie geeft ons vertrouwen dat elke citaat correct en traceerbaar is.'],
    ['The platform lets our small firm compete with larger practices thanks to its powerful research tools.', 'Dankzij de krachtige onderzoekstools kan ons kleinere kantoor concurreren met grotere praktijken.'],
    ['Oops! Something went wrong.', 'Oeps! Er ging iets mis.'],
    ['Included with every plan.', 'Inbegrepen in elk plan.'],
    ['Get the essential tools you need without limitations.', 'Krijg de essentiële tools die je nodig hebt, zonder beperkingen.'],
    ['Brieflee lets you search across its curated database of Belgian case law and articles of law, alongside approved external sources.', 'Met Brieflee kun je zoeken in een gecureerde databank van Belgische rechtspraak en wetsartikelen, naast goedgekeurde externe bronnen.'],
    ['You can search directly for specific documents or ask questions in a chat-style interface to receive tailored, source-backed answers. Find decisions by date or criteria, compare internal legal sources with online results, or search by voice, all grounded in verifiable legal material.', 'Je kunt rechtstreeks zoeken naar specifieke documenten of vragen stellen in een chatinterface om antwoorden op maat te krijgen met bronvermelding. Vind uitspraken op datum of criteria, vergelijk interne juridische bronnen met online resultaten of zoek via spraak, alles gebaseerd op verifieerbaar juridisch materiaal.'],
    ['Every answer, backed by real sources', 'Elk antwoord, onderbouwd met echte bronnen'],
    ['Every legal statement in Brieflee is backed by real sources. You can inspect the exact passage, view it in full context, and open the original decision or article of law directly inside the platform.', 'Elke juridische stelling in Brieflee is onderbouwd met echte bronnen. Je kunt de exacte passage controleren, die in volledige context bekijken en de originele uitspraak of het wetsartikel rechtstreeks in het platform openen.'],
    ['Verify sources in full context', 'Verifieer bronnen in volledige context'],
    ['When a legal statement is supported by a source, you can open the full decision or article of law and jump directly to the exact passage where the legal teaching is derived.', 'Wanneer een juridische stelling door een bron wordt ondersteund, kun je de volledige uitspraak of het wetsartikel openen en meteen naar de exacte passage springen waarop de juridische conclusie is gebaseerd.'],
    ['“View in full text” takes you to the precise location in the original document, allowing you to read the reasoning in its full legal context.', '"View in full text" brengt je naar de precieze locatie in het originele document, zodat je de redenering in de volledige juridische context kunt lezen.'],
    ['Compare Brieflee', 'Vergelijk Brieflee'],
    ['What makes Brieflee\'s Legal research better than the rest?', 'Wat maakt Brieflee\'s juridisch onderzoek beter dan de rest?'],
    ['Brieflee is built around source-grounded legal research, where every statement can be verified directly against primary law.', 'Brieflee is gebouwd rond brongebaseerd juridisch onderzoek, waarbij elke stelling rechtstreeks kan worden geverifieerd aan de hand van primaire rechtsbronnen.'],
    ['Case law and articles of law, available in full text', 'Rechtspraak en wetsartikelen, beschikbaar in volledige tekst'],
    ['Verification', 'Verificatie'],
    ['Every statement linked to its exact legal source', 'Elke stelling gekoppeld aan de exacte juridische bron'],
    ['Transparency', 'Transparantie'],
    ['View the full decision and legal reasoning in context', 'Bekijk de volledige uitspraak en juridische redenering in context'],
    ['Lawyer remains responsible for judgment and use', 'De advocaat blijft verantwoordelijk voor oordeel en gebruik'],
    ['Designed for real legal work and professional secrecy', 'Ontworpen voor echt juridisch werk en beroepsgeheim'],
    ['Often unclear or not inspectable', 'Vaak onduidelijk of niet controleerbaar'],
    ['Answers cannot always be traced to primary law', 'Antwoorden zijn niet altijd herleidbaar tot primaire rechtsbronnen'],
    ['Limited or no access to original legal texts', 'Beperkte of geen toegang tot originele juridische teksten'],
    ['Outputs require extra external verification', 'Output vereist extra externe verificatie'],
    ['General information, not legal research', 'Algemene informatie, geen juridisch onderzoek'],
    ['Brieflee structures the back-and-forth reasoning, highlights weaknesses, and allows you to explore follow-up counter-arguments — helping you see the full legal picture of a case.', 'Brieflee structureert de heen-en-weerredenering, markeert zwakke punten en laat je vervolgtegenargumenten verkennen — zo zie je het volledige juridische plaatje van een dossier.'],
    ['Ideal for complex cases involving multiple contracts, decisions, or factual developments across time.', 'Ideaal voor complexe dossiers met meerdere contracten, uitspraken of feitelijke ontwikkelingen doorheen de tijd.'],
    ['The workflow tools fit well with how I actually prepare cases. I use them to analyze documents, identify important points, and work through arguments in a more structured way. It doesn’t replace my reasoning, but it supports it in a way that feels natural.', 'De workflowtools sluiten goed aan bij hoe ik dossiers echt voorbereid. Ik gebruik ze om documenten te analyseren, belangrijke punten te identificeren en argumenten op een meer gestructureerde manier uit te werken. Het vervangt mijn redenering niet, maar ondersteunt ze op een natuurlijke manier.'],
    ['Turn research, arguments, and evidence into courtroom-ready documents.', 'Zet onderzoek, argumenten en bewijs om in zittingsklare documenten.'],
    ['Brieflee structures facts, legal reasoning, and citations into clear drafts you can refine, edit, and export — always grounded in real legal sources.', 'Brieflee structureert feiten, juridische redenering en citaten in duidelijke concepten die je kunt verfijnen, bewerken en exporteren — altijd gebaseerd op echte juridische bronnen.'],
    ['Everything you need to draft with confidence.', 'Alles wat je nodig hebt om met vertrouwen op te stellen.'],
    ['Upload multiple documents — pleadings, contracts, correspondence — and let Brieflee generate structured, source-backed conclusions grounded in your full case file.', 'Upload meerdere documenten — conclusies, contracten, correspondentie — en laat Brieflee gestructureerde, brononderbouwde conclusies genereren op basis van je volledige dossier.'],
    ['Import directly from your computer or integrate with SharePoint to work from the complete record.', 'Importeer rechtstreeks vanaf je computer of integreer met SharePoint om vanuit het volledige dossier te werken.'],
    ['Before generating a conclusion, Brieflee builds a chronological timeline from all uploaded documents.', 'Voor een conclusie wordt gegenereerd, bouwt Brieflee een chronologische tijdlijn op uit alle geüploade documenten.'],
    ['It identifies key events, detects gaps or missing files, and highlights what’s needed — so your draft is based on a complete and verified factual record.', 'Brieflee identificeert sleutelmomenten, detecteert hiaten of ontbrekende bestanden en markeert wat nog nodig is — zodat je concept gebaseerd is op een volledig en geverifieerd feitenrelaas.'],
    ['What makes Brieflee\'s', 'Wat maakt Brieflee\'s'],
    ['better than the rest?', 'beter dan de rest?'],
    ['Brieflee drafts from structured case analysis, mapped arguments, and verified sources, preserving legal nuance and internal consistency across every section.', 'Brieflee stelt op vanuit gestructureerde dossieranalyse, gemapte argumenten en geverifieerde bronnen, met behoud van juridische nuance en interne consistentie in elke sectie.'],
    ['Structured Case Intelligence', 'Gestructureerde dossierintelligentie'],
    ['Grounded in structured legal analysis', 'Gebaseerd op gestructureerde juridische analyse'],
    ['Builds a verified timeline and flags gaps', 'Bouwt een geverifieerde tijdlijn en markeert hiaten'],
    ['Every statement traced to its legal source', 'Elke stelling herleidbaar tot de juridische bron'],
    ['Multi-Document Context', 'Context over meerdere documenten'],
    ['Synthesizes across your full case file', 'Synthetiseert over je volledige dossier'],
    ['Argument & Counter-Argument Mapping', 'Mapping van argumenten & tegenargumenten'],
    ['Maps weaknesses and generates counterarguments', 'Brengt zwakke punten in kaart en genereert tegenargumenten'],
    ['Starts from generic text generation', 'Start vanuit generieke tekstgeneratie'],
    ['No case chronology validation', 'Geen validatie van dossierchronologie'],
    ['References inserted without traceability', 'Referenties ingevoegd zonder traceerbaarheid'],
    ['Limited to a single text input', 'Beperkt tot één tekstinvoer'],
    ['No adversarial analysis or argument testing', 'Geen adversariële analyse of argumenttoetsing'],
    ['Add some disclaimer text here if necessary.', 'Voeg hier indien nodig een disclaimer toe.'],
    ['for how lawyers', 'voor hoe advocaten'],
    ['Founding team', 'Oprichtersteam'],
    ['Co-founder & COO', 'Medeoprichter & COO'],
    ['Co-founder & CEO', 'Medeoprichter & CEO'],
    ['Co-founder & Co-CTO', 'Medeoprichter & Co-CTO'],
    ['We’re building the future of legal work.', 'We bouwen aan de toekomst van juridisch werk.'],
    ['The people behind Brieflee', 'De mensen achter Brieflee'],
    ['Built by founders who understand legal work.', 'Gebouwd door oprichters die juridisch werk begrijpen.'],
    ['Brieflee is built by founders who have worked closely with lawyers and legal professionals and experienced firsthand how fragmented, slow, and opaque legal research and analysis can be.', 'Brieflee is gebouwd door oprichters die nauw hebben samengewerkt met advocaten en juridische professionals en van dichtbij hebben ervaren hoe versnipperd, traag en ondoorzichtig juridisch onderzoek en analyse kunnen zijn.'],
    ['We’ve built startups before, worked with real users in production, and we’re now focused on one thing: creating a platform lawyers can rely on for serious work — grounded in law, not guesswork.', 'We hebben eerder startups gebouwd, met echte gebruikers in productie gewerkt en focussen nu op één ding: een platform creëren waarop advocaten kunnen vertrouwen voor ernstig werk — gebaseerd op recht, niet op giswerk.'],
    ['If you care about building tools that professionals actually trust and use, you’ll feel at home here.', 'Als je graag tools bouwt die professionals echt vertrouwen en gebruiken, voel je je hier thuis.'],
    ['Trees planted by the Artifact team in 2025.', 'Bomen geplant door het Artifact-team in 2025.'],
    ['Legal Engineer', 'Juridisch engineer'],
    ['Brieflee brings structure to legal research, case analysis, and argument building — so you spend less time searching and more time strategizing.', 'Brieflee brengt structuur in juridisch onderzoek, dossieranalyse en argumentatieopbouw — zodat je minder tijd verliest met zoeken en meer tijd hebt voor strategie.'],
    ['Automate routine research and document review. Let Brieflee handle the groundwork while you focus on higher-value, strategic work for your clients.', 'Automatiseer routineonderzoek en documentreview. Laat Brieflee het voorbereidende werk doen, terwijl jij focust op strategisch werk met hogere meerwaarde voor je cliënten.'],
    ['Organization', 'Organisatie'],
    ['Law firm, corporate legal department, or other organization', 'Advocatenkantoor, bedrijfsjuridische dienst of andere organisatie'],
    ['How did you hear about us?', 'Hoe heb je over ons gehoord?'],
    ['Select an option', 'Selecteer een optie'],
    ['Google search', 'Google-zoekopdracht'],
    ['Colleague or referral', 'Collega of doorverwijzing'],
    ['Conference or event', 'Conferentie of evenement'],
    ['Legal publication', 'Juridische publicatie'],
    ['I have read and agree to the', 'Ik heb de'],
    ['. We will never share your information with third parties.', '. We delen je gegevens nooit met derden.'],
    ['Welcome to Artifact', 'Welkom bij Artifact'],
    ['Artifact is a premium software and SaaS template designed for SaaS startups, software companies, cloud AI tools and more.', 'Artifact is een premium software- en SaaS-template ontworpen voor SaaS-startups, softwarebedrijven, cloud-AI-tools en meer.'],
    ['All killer, no filler.', 'Alleen het beste, geen ballast.'],
    ['Artifact is brimming with premium layouts and sections designed with true purpose.', 'Artifact zit boordevol premium lay-outs en secties die doelgericht zijn ontworpen.'],
    ['No copy-paste clones.', 'Geen copy-paste klonen.'],
    ['Hit the ground running with a variety of stylish pages to suit multiple purposes.', 'Ga vliegend van start met stijlvolle pagina\'s voor uiteenlopende doeleinden.'],
    ['Build your own page layouts in moments with tons of hand-crafted sections.', 'Bouw in enkele ogenblikken je eigen paginalay-outs met een massa handgemaakte secties.'],
    ['Variables galore.', 'Variabelen in overvloed.'],
    ['Make site-wide design changes in seconds using Webflow variables.', 'Voer sitebrede designaanpassingen in seconden door met Webflow-variabelen.'],
    ['Figma file included', 'Figma-bestand inbegrepen'],
    ['Take full control of the Artifact design', 'Neem volledige controle over het Artifact-design'],
    ['Frictionless customization.', 'Aanpassen zonder frictie.'],
    ['The Figma file matches Artifact’s Webflow variables, making your design workflow seamless.', 'Het Figma-bestand sluit aan op Artifact\'s Webflow-variabelen, zodat je designworkflow naadloos verloopt.'],
    ['Prototype, polish, profit.', 'Prototypeer, verfijn, lever op.'],
    ['Impress clients sooner and streamline your path from concept to invoice.', 'Maak sneller indruk op klanten en stroomlijn je traject van concept tot factuur.'],
    ['General purpose', 'Algemeen gebruik'],
    ['200+ Reviews', '200+ beoordelingen'],
    ['60+ Sections.', '60+ secties.'],
    ['Consumer focus', 'Focus op consumenten'],
    ['Enterprise focus', 'Focus op enterprise'],
    ['Features pages', 'Featurepagina\'s'],
    ['Software showcase', 'Softwareshowcase'],
    ['Multipurpose', 'Multifunctioneel'],
    ['Our Technology', 'Onze technologie'],
    ['Showcase success', 'Succesverhalen'],
    ['Customer Story', 'Klantverhaal'],
    ['Static (Non e-com)', 'Statisch (geen e-commerce)'],
    ['Webflow E-Commerce', 'Webflow e-commerce'],
    ['Request Demo', 'Demo aanvragen'],
    ['Lead Capture', 'Leadcaptatie'],
    ['Career Single', 'Vacaturedetail'],
    ['with contact form', 'met contactformulier'],
    ['Terms, Privacy etc.', 'Voorwaarden, privacy, enz.'],
    ['Product deep-dive', 'Diepgaande productanalyse']
  ],
  'fr-be': [
    ['Welcome to Brieflee', 'Bienvenue sur Brieflee'],
    ['Built on sources,', 'Construit sur des sources,'],
    ['not shortcuts.', 'pas sur des raccourcis.'],
    ['The AI-powered legal workspace for research, analysis, and drafting — grounded in real sources you can verify.', 'L\'espace de travail juridique propulsé par l\'IA pour la recherche, l\'analyse et la rédaction — ancré dans des sources réelles et vérifiables.'],
    ['Search grounded law', 'Recherchez un droit fondé sur les sources'],
    ['Find relevant case law and articles of law, with sources you can inspect and verify.', 'Trouvez la jurisprudence pertinente et les articles de loi, avec des sources que vous pouvez consulter et vérifier.'],
    ['Reason across documents', 'Raisonnez à travers les documents'],
    ['Analyze multiple files, identify weaknesses, and structure arguments using legal workflows.', 'Analysez plusieurs fichiers, identifiez les faiblesses et structurez les arguments avec des flux de travail juridiques.'],
    ['Draft faster', 'Rédigez plus vite'],
    ['Generate structured, source-based drafts and refine them directly in Brieflee.', 'Générez des brouillons structurés et sourcés, puis affinez-les directement dans Brieflee.'],
    ['Built for the way', 'Conçu pour la manière dont les'],
    ['actually work', 'travaillent réellement'],
    ['Analyze faster', 'Analysez plus vite'],
    ['Empower your team to simplify case complexity. Brieflee transforms documents into insights, extracting facts and timelines to highlight what matters.', 'Donnez à votre équipe les moyens de simplifier la complexité des dossiers. Brieflee transforme les documents en insights, en extrayant les faits et les chronologies pour mettre en évidence l\'essentiel.'],
    ['Research smarter', 'Recherchez plus intelligemment'],
    ['Go beyond manual search. Brieflee connects insights with relevant law, streamlining your workflow for better outcomes.', 'Allez au-delà de la recherche manuelle. Brieflee relie les insights au droit pertinent et simplifie votre flux de travail pour de meilleurs résultats.'],
    ['Argue stronger', 'Argumentez plus solidement'],
    ['Build structured, source-grounded arguments. Brieflee helps identify weaknesses, counterarguments, and supporting precedents.', 'Construisez des arguments structurés et ancrés dans les sources. Brieflee aide à identifier les faiblesses, les contre-arguments et les précédents pertinents.'],
    ['Draft seamlessly', 'Rédigez sans friction'],
    ['Transform insights into legal documents. Generate notices, briefs, and memos — accurate and editable. Deliver quality drafts faster while maintaining control.', 'Transformez les insights en documents juridiques. Générez des notifications, conclusions et mémos — précis et modifiables. Produisez plus vite des brouillons de qualité tout en gardant le contrôle.'],
    ['Explore product', 'Découvrir le produit'],
    ['Clear boundaries for professional use.', 'Des limites claires pour un usage professionnel.'],
    ['Built for confidential matters', 'Conçu pour les dossiers confidentiels'],
    ['Grounded in verifiable sources', 'Ancré dans des sources vérifiables'],
    ['You stay in control', 'Vous gardez le contrôle'],
    ['Not a black-box chatbot', 'Pas un chatbot boîte noire'],
    ['Not a replacement for legal judgment', 'Pas un remplacement du jugement juridique'],
    ['Not trained on your client files', 'Non entraîné sur vos dossiers clients'],
    ['Flexible pricing that scales with you', 'Des tarifs flexibles qui évoluent avec vous'],
    ['Choose a plan that fits your team\'s needs, from individual to enterprise.', 'Choisissez une offre adaptée à votre équipe, de l\'individuel au niveau entreprise.'],
    ['Custom Offer', 'Offre sur mesure'],
    ['Get in touch', 'Nous contacter'],
    ['See why customers love using Brieflee', 'Découvrez pourquoi nos clients aiment Brieflee'],
    ['Ready to work smarter?', 'Prêt à travailler plus intelligemment ?'],
    ['Join the legal teams already using Brieflee', 'Rejoignez les équipes juridiques qui utilisent déjà Brieflee'],
    ['Thank you! We\'ll be in touch soon.', 'Merci ! Nous vous recontactons rapidement.'],
    ['Oops! Something went wrong. Please try again.', 'Oups ! Une erreur est survenue. Veuillez réessayer.'],
    ['Brieflee\'s integrated legal workspace streamlines legal workflows and helps lawyers focus on higher-value, strategic work.', 'L\'espace de travail juridique intégré de Brieflee rationalise les flux de travail juridiques et aide les avocats à se concentrer sur un travail stratégique à plus forte valeur.'],
    ['Pages', 'Pages'],
    ['Home', 'Accueil'],
    ['Product', 'Produit'],
    ['Customers', 'Clients'],
    ['Security', 'Sécurité'],
    ['Pricing', 'Tarifs'],
    ['About', 'À propos'],
    ['Resources', 'Ressources'],
    ['Company', 'Entreprise'],
    ['Overview', 'Vue d\'ensemble'],
    ['Analyze', 'Analyser'],
    ['Argue', 'Argumenter'],
    ['Draft', 'Rédaction'],
    ['Research', 'Recherche'],
    ['Status Page', 'Page de statut'],
    ['Trust Center', 'Centre de confiance'],
    ['Careers', 'Carrières'],
    ['Contact us', 'Contactez-nous'],
    ['All rights reserved.', 'Tous droits réservés.'],
    ['By subscribing you agree to our', 'En vous abonnant, vous acceptez notre'],
    ['Privacy Policy', 'Politique de confidentialité'],
    ['Thank you for subscribing!', 'Merci pour votre abonnement !'],
    ['Request a demo', 'Demander une démo'],
    ['Search then hit enter', 'Recherchez puis appuyez sur Entrée'],
    ['Search…', 'Rechercher…'],
    ['Search', 'Rechercher'],
    ['Login', 'Connexion'],
    ['Smarter research, built for litigation', 'Une recherche plus intelligente, conçue pour le contentieux'],
    ['Legal workflows, built around real cases', 'Des flux de travail juridiques construits autour de dossiers réels'],
    ['Analyze and review legal documents through guided workflows — from issue extraction and red-flagging to summarization, comparison, proofreading, and translation — all while keeping legal judgment in your hands.', 'Analysez et révisez des documents juridiques via des flux de travail guidés — de l\'extraction des enjeux au signalement des risques, à la synthèse, la comparaison, la relecture et la traduction — tout en gardant le jugement juridique entre vos mains.'],
    ['Analyze arguments and counter-arguments', 'Analysez les arguments et contre-arguments'],
    ['Use workflows to map arguments and counter-arguments across submissions, responses, and replies.', 'Utilisez des flux de travail pour cartographier les arguments et contre-arguments à travers conclusions, réponses et répliques.'],
    ['Build chronological timelines from multiple documents', 'Construisez des chronologies à partir de plusieurs documents'],
    ['Automatically extract and organize events from different documents into a single chronological timeline.', 'Extrayez et organisez automatiquement les événements issus de différents documents dans une seule chronologie.'],
    ['Extract key information from legal documents', 'Extrayez les informations clés des documents juridiques'],
    ['Analyze documents to extract essential information such as parties involved, procedural posture, final outcome, and concise summaries — all presented in a structured, reviewable format.', 'Analysez les documents pour extraire les informations essentielles telles que les parties impliquées, la posture procédurale, l\'issue finale et des synthèses concises — le tout présenté dans un format structuré et vérifiable.'],
    ['Workflows you can inspect, review, and refine', 'Des flux de travail que vous pouvez inspecter, relire et affiner'],
    ['Each workflow follows a clear sequence: reading documents, extracting information, structuring analysis, and presenting results in a reviewable format.', 'Chaque flux de travail suit une séquence claire : lecture des documents, extraction des informations, structuration de l\'analyse et présentation des résultats dans un format vérifiable.'],
    ['Outputs are never final decisions. They are structured working material that you can inspect, adjust, export, or discard — keeping legal judgment fully with the lawyer.', 'Les résultats ne sont jamais des décisions finales. Ce sont des supports de travail structurés que vous pouvez inspecter, ajuster, exporter ou écarter — en laissant pleinement le jugement juridique à l\'avocat.'],
    ['The Others', 'Les autres'],
    ['See Brieflee in action', 'Découvrez Brieflee en action'],
    ['Book a personalized walkthrough and discover how Brieflee helps litigation teams draft, research, and analyze cases with structure and control.', 'Réservez une démonstration personnalisée et découvrez comment Brieflee aide les équipes contentieuses à rédiger, rechercher et analyser leurs dossiers avec structure et contrôle.'],
    ['We\'ll walk you through how Brieflee can fit your practice — research workflows, source integrations, and team setup. No commitment, no generic sales deck.', 'Nous vous montrons comment Brieflee peut s\'intégrer à votre pratique — flux de recherche, intégrations de sources et configuration d\'équipe. Sans engagement, sans présentation commerciale générique.'],
    ['Let\'s connect', 'Parlons-en'],
    ['The future of litigation workflows', 'L\'avenir des flux de travail contentieux'],
    ['Maximize your billable hours', 'Maximisez vos heures facturables'],
    ['Send us a message', 'Envoyez-nous un message'],
    ['First name', 'Prénom'],
    ['Last name', 'Nom'],
    ['Your message', 'Votre message'],
    ['Tell us how we can help...', 'Expliquez-nous comment nous pouvons vous aider...'],
    ['By submitting this form, you agree to our', 'En envoyant ce formulaire, vous acceptez notre'],
    ['Send message', 'Envoyer le message'],
    ['Thank you! Your submission has been received!', 'Merci ! Votre envoi a bien été reçu !'],
    ['Oops! Something went wrong while submitting the form.', 'Oups ! Une erreur est survenue lors de l\'envoi du formulaire.'],
    ['About us', 'À propos'],
    ['Building legal intelligence', 'Construire l\'intelligence juridique'],
    ['founded by lawyers, built for the realities of practice', 'fondé par des avocats, conçu pour la réalité du terrain'],
    ['Why Brieflee exists', 'Pourquoi Brieflee existe'],
    ['The story so far.', 'L\'histoire jusqu\'ici.'],
    ['Last updated: 13 February 2026', 'Dernière mise à jour : 13 février 2026'],
    ['The fast way to an expensive-looking site', 'Le moyen rapide d\'obtenir un site au rendu premium'],
    ['Verify every legal statement.', 'Vérifiez chaque affirmation juridique.'],
    ['Draft with sources attached.', 'Rédigez avec des sources attachées.'],
    ['Keep full professional control.', 'Conservez un contrôle professionnel total.'],
    ['Find relevant case law.', 'Trouvez la jurisprudence pertinente.'],
    ['Workflows', 'Flux de travail'],
    ['Essential tools for solo practitioners and small teams.', 'Des outils essentiels pour les praticiens seuls et les petites équipes.'],
    ['What\'s included?', 'Ce qui est inclus ?'],
    ['What’s included?', 'Ce qui est inclus ?'],
    ['Document analysis workflows', 'Flux de travail d\'analyse documentaire'],
    ['Unlimited access and priority support for growing firms.', 'Accès illimité et support prioritaire pour les cabinets en croissance.'],
    ['Everything in Basic', 'Tout ce qui est dans Basic'],
    ['Unlimited workflows &amp; drafting', 'Flux de travail et rédaction illimités'],
    ['Priority support line', 'Ligne de support prioritaire'],
    ['Early access to new features', 'Accès anticipé aux nouvelles fonctionnalités'],
    ['Most popular', 'Le plus populaire'],
    ['The drafting workflows have transformed how we prepare briefs and memoranda for our clients.', 'Les flux de rédaction ont transformé notre manière de préparer des conclusions et des mémorandums pour nos clients.'],
    ['Brieflee is essential for modern legal practice. The AI-powered workflows save us hours every week.', 'Brieflee est essentiel pour la pratique juridique moderne. Les flux de travail alimentés par l\'IA nous font gagner des heures chaque semaine.'],
    ['Legal Research', 'Recherche juridique'],
    ['Launched workflows — analyse, review, and red-flag', 'Lancement des workflows — analyse, revue et signalement des risques'],
    ['Launched Draft — automated legal conclusions', 'Lancement de Draft — conclusions juridiques automatisées'],
    ['Brieflee was founded', 'Brieflee a été fondé'],
    ['First prototype launched for legal research', 'Premier prototype lancé pour la recherche juridique'],
    ['Integrated the majority of publicly available Belgian case law', 'Intégration de la majorité de la jurisprudence belge publiquement disponible'],
    ['Integrated all Belgian legislation and statutory articles', 'Intégration de l\'ensemble de la législation belge et des articles statutaires'],
    ['Introduced a new legal ontology to improve search and drafting accuracy', 'Introduction d\'une nouvelle ontologie juridique pour améliorer la précision de la recherche et de la rédaction'],
    ['Brieflee was born out of direct experience with the realities of legal work.', 'Brieflee est né d\'une expérience directe des réalités du travail juridique.'],
    ['Our CEO began his career as a lawyer and, by the age of 26, experienced a severe burnout caused by the pace, pressure, and inefficiencies of day-to-day legal practice. The issue wasn’t a lack of effort or ambition, it was a system that demanded more hours instead of better tools.', 'Notre CEO a commencé sa carrière comme avocat et, à 26 ans, a connu un burn-out sévère causé par le rythme, la pression et les inefficacités de la pratique juridique quotidienne. Le problème n\'était pas un manque d\'effort ou d\'ambition, mais un système qui exigeait plus d\'heures au lieu de meilleurs outils.'],
    ['Legal professionals are expected to process vast amounts of information, reason precisely under time pressure, and deliver flawless results, often with technology that hasn’t meaningfully evolved in decades.', 'Les professionnels du droit doivent traiter des volumes massifs d\'information, raisonner avec précision sous pression temporelle et fournir des résultats irréprochables, souvent avec une technologie qui n\'a pas évolué de manière significative depuis des décennies.'],
    ['That experience became the catalyst for Brieflee.', 'Cette expérience est devenue le catalyseur de Brieflee.'],
    ['Instead of accepting burnout as “part of the job,” we set out to build legal infrastructure that reduces cognitive overload, surfaces relevant insight faster, and supports how lawyers actually think and work.', 'Au lieu d\'accepter le burn-out comme "fait partie du métier", nous avons décidé de construire une infrastructure juridique qui réduit la surcharge cognitive, fait émerger plus vite les informations pertinentes et soutient la manière dont les avocats pensent et travaillent réellement.'],
    ['Key moments in our ongoing mission to free lawyers from unnecessary friction', 'Moments clés de notre mission continue pour libérer les avocats des frictions inutiles'],
    ['Brieflee is not about replacing legal judgment. It’s about giving lawyers the clarity, structure, and confidence to do their best work, without sacrificing their health in the process.', 'Brieflee ne vise pas à remplacer le jugement juridique. Il vise à donner aux avocats la clarté, la structure et la confiance nécessaires pour faire leur meilleur travail, sans sacrifier leur santé au passage.'],
    ['March 2025', 'Mars 2025'],
    ['May 2025', 'Mai 2025'],
    ['September 2025', 'Septembre 2025'],
    ['November 2025', 'Novembre 2025'],
    ['January 2026', 'Janvier 2026'],
    ['February 2026', 'Février 2026'],
    ['Future', 'À venir'],
    ['More goodness', 'Encore plus de valeur'],
    ['What is Brieflee?', 'Qu\'est-ce que Brieflee ?'],
    ['Brieflee is a legal research and drafting platform that helps lawyers search case law, analyze documents, and draft legal outputs with verifiable sources.', 'Brieflee est une plateforme de recherche et de rédaction juridiques qui aide les avocats à rechercher la jurisprudence, analyser les documents et rédiger des livrables juridiques avec des sources vérifiables.'],
    ['What can I do with Brieflee?', 'Que puis-je faire avec Brieflee ?'],
    ['You can use Brieflee to:', 'Vous pouvez utiliser Brieflee pour :'],
    ['- Search Belgian and EU case law and articles of law using both keyword search and natural language questions', '- Rechercher la jurisprudence belge et européenne ainsi que les articles de loi, via des mots-clés ou des questions en langage naturel'],
    ['- Verify legal answers with citations and jump to the exact source text', '- Vérifier les réponses juridiques avec des citations et accéder directement au passage source exact'],
    ['- Upload your own documents to analyze them in context', '- Importer vos propres documents pour les analyser en contexte'],
    ['- Identify legal issues, weaknesses, and counter-arguments', '- Identifier les enjeux juridiques, les faiblesses et les contre-arguments'],
    ['- Structure timelines and key facts across multiple documents', '- Structurer des chronologies et des faits clés sur plusieurs documents'],
    ['- Draft legal documents and conclusions that you can edit and refine', '- Rédiger des documents juridiques et des conclusions que vous pouvez modifier et affiner'],
    ['Brieflee supports legal research, analysis, and drafting, while keeping the lawyer in control.', 'Brieflee prend en charge la recherche, l\'analyse et la rédaction juridiques tout en laissant l\'avocat en contrôle.'],
    ['Who is Brieflee for?', 'À qui s\'adresse Brieflee ?'],
    ['Brieflee is designed for lawyers and legal professionals who need reliable legal research, source-backed answers, and drafting support for real cases.', 'Brieflee est conçu pour les avocats et professionnels du droit qui ont besoin d\'une recherche juridique fiable, de réponses étayées par des sources et d\'un support de rédaction pour des dossiers réels.'],
    ['How is Brieflee different from a general AI chatbot?', 'En quoi Brieflee est-il différent d\'un chatbot IA généraliste ?'],
    ['Brieflee is purpose-built for legal work — not a general-purpose chatbot. Every output is grounded in case law, statutes, and verified legal sources. You can inspect each citation, view the full source text, and verify the reasoning before relying on it.', 'Brieflee est spécialement conçu pour le travail juridique — ce n\'est pas un chatbot généraliste. Chaque résultat est ancré dans la jurisprudence, les textes légaux et des sources juridiques vérifiées. Vous pouvez inspecter chaque citation, consulter le texte source complet et vérifier le raisonnement avant de vous y fier.'],
    ['Can I upload my own documents?', 'Puis-je importer mes propres documents ?'],
    ['Yes. You can upload contracts, pleadings, judgments, and other legal documents to analyze them in context. Brieflee can extract timelines, identify issues, and generate draft outputs grounded in your files.', 'Oui. Vous pouvez importer des contrats, conclusions, jugements et autres documents juridiques pour les analyser en contexte. Brieflee peut extraire des chronologies, identifier les enjeux et générer des brouillons fondés sur vos fichiers.'],
    ['Can I verify where an answer comes from?', 'Puis-je vérifier d\'où vient une réponse ?'],
    ['Yes. Brieflee shows citations and allows you to view the exact passage in the source document (“view in full text”) behind each legal statement.', 'Oui. Brieflee affiche les citations et vous permet de voir le passage exact du document source ("voir en texte intégral") derrière chaque affirmation juridique.'],
    ['Does Brieflee replace legal judgment or advice?', 'Brieflee remplace-t-il le jugement ou le conseil juridique ?'],
    ['No. Brieflee is a tool that supports research, analysis, and drafting. The lawyer always remains in control — all legal judgment and final responsibility stay with you.', 'Non. Brieflee est un outil qui soutient la recherche, l\'analyse et la rédaction. L\'avocat reste toujours en contrôle — tout jugement juridique et toute responsabilité finale vous reviennent.'],
    ['Is my client data used to train AI models?', 'Mes données clients sont-elles utilisées pour entraîner des modèles d\'IA ?'],
    ['No. Your documents, queries, and outputs are never used to train any AI model — not ours, and not any third party&rsquo;s.', 'Non. Vos documents, requêtes et résultats ne sont jamais utilisés pour entraîner un modèle d\'IA — ni le nôtre, ni celui d\'un tiers.'],
    ['Where is my data hosted?', 'Où mes données sont-elles hébergées ?'],
    ['All data is hosted in the EU (AWS, Paris region) and encrypted at rest and in transit. AI capabilities are delivered through Azure OpenAI, with no data shared outside your secure environment.', 'Toutes les données sont hébergées dans l\'UE (AWS, région Paris) et chiffrées au repos comme en transit. Les capacités IA sont fournies via Azure OpenAI, sans partage de données en dehors de votre environnement sécurisé.'],
    ['Draft litigation documents with structure and control.', 'Rédigez des documents contentieux avec structure et contrôle.'],
    ['Draft with full case context', 'Rédigez avec le contexte complet du dossier'],
    ['Draft from a complete case timeline', 'Rédigez à partir d\'une chronologie complète du dossier'],
    ['Research is now direct. Brieflee links case facts to relevant law and doctrine instantly, ensuring accuracy and saving hours of work.', 'La recherche est désormais directe. Brieflee relie instantanément les faits du dossier au droit et à la doctrine pertinents, pour plus de précision et des heures gagnées.'],
    ['98% Satisfaction from over 600 verified reviews.', '98% de satisfaction sur plus de 600 avis vérifiés.'],
    ['BZ Trade BV (&ldquo;BZ Trade&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), a Belgian limited liability company with its registered seat at Charlottalei 58, 2018 Antwerp, operates the online platform Brieflee.be (the &ldquo;Service&rdquo;). BZ Trade acts as Data Controller for the personal data described in this policy. Contact us at support@brieflee.be.', 'BZ Trade BV (&ldquo;BZ Trade&rdquo;, &ldquo;nous&rdquo;, &ldquo;notre&rdquo;), société belge à responsabilité limitée ayant son siège social à Charlottalei 58, 2018 Anvers, exploite la plateforme en ligne Brieflee.be (le &ldquo;Service&rdquo;). BZ Trade agit en tant que responsable du traitement des données personnelles décrites dans cette politique. Contactez-nous via support@brieflee.be.'],
    ['Built by experienced founders who understand legal work, and are serious about improving it.', 'Conçu par des fondateurs expérimentés qui comprennent le travail juridique et veulent réellement l\'améliorer.'],
    ['Designed for legal work that involves client confidentiality and professional secrecy.', 'Conçu pour le travail juridique impliquant la confidentialité client et le secret professionnel.'],
    ['Every legal statement is linked to real case law or statutory sources you can inspect.', 'Chaque affirmation juridique est liée à de la jurisprudence réelle ou à des sources légales que vous pouvez vérifier.'],
    ['Brieflee assists with preparation and drafting, final judgment remains with the lawyer.', 'Brieflee assiste la préparation et la rédaction ; le jugement final reste celui de l\'avocat.'],
    ['Legal outputs are transparent and traceable, not opaque AI-generated text.', 'Les livrables juridiques sont transparents et traçables, pas du texte IA opaque.'],
    ['Brieflee supports legal reasoning but does not make legal decisions.', 'Brieflee soutient le raisonnement juridique mais ne prend aucune décision juridique.'],
    ['Customer documents and inputs are not used to train public or shared AI models.', 'Les documents et entrées clients ne sont pas utilisés pour entraîner des modèles d\'IA publics ou partagés.'],
    ['Hello 👋 I’m Maor', 'Bonjour 👋 Je suis Maor'],
    ['Let me know if you have any questions about Brieflee.', 'N\'hésitez pas à me dire si vous avez des questions sur Brieflee.'],
    ['Legal work depends on accuracy, sources, and professional judgment.', 'Le travail juridique repose sur la précision, les sources et le jugement professionnel.'],
    ['Brieflee is built to support that, not replace it.', 'Brieflee est conçu pour soutenir cela, pas pour le remplacer.'],
    ['Built by founders who have worked closely with lawyers and legal teams.', 'Conçu par des fondateurs qui ont travaillé de près avec des avocats et des équipes juridiques.'],
    ['Legal research & case law', 'Recherche juridique & jurisprudence'],
    ['AI-powered drafting', 'Rédaction assistée par IA'],
    ['Onboarding & email support', 'Onboarding & support e-mail'],
    ['Tailored solutions for firms with six or more users.', 'Des solutions sur mesure pour les cabinets de six utilisateurs ou plus.'],
    ['Everything in Growth', 'Tout ce qui est dans Growth'],
    ['Dedicated account manager', 'Account manager dédié'],
    ['API access & custom integrations', 'Accès API & intégrations sur mesure'],
    ['Team management & admin controls', 'Gestion d\'équipe & contrôles admin'],
    ['Brieflee cut our legal research time in half. We find relevant case law faster than ever before.', 'Brieflee a réduit de moitié notre temps de recherche juridique. Nous trouvons la jurisprudence pertinente plus vite que jamais.'],
    ['Brieflee has been instrumental in streamlining our document analysis and surfacing insights we would have missed.', 'Brieflee a été déterminant pour fluidifier notre analyse documentaire et faire émerger des insights que nous aurions manqués.'],
    ['The source verification feature gives us confidence that every citation is accurate and traceable.', 'La fonctionnalité de vérification des sources nous assure que chaque citation est exacte et traçable.'],
    ['The platform lets our small firm compete with larger practices thanks to its powerful research tools.', 'La plateforme permet à notre petit cabinet de rivaliser avec de plus grandes structures grâce à ses puissants outils de recherche.'],
    ['Oops! Something went wrong.', 'Oups ! Une erreur est survenue.'],
    ['Included with every plan.', 'Inclus dans chaque offre.'],
    ['Get the essential tools you need without limitations.', 'Obtenez les outils essentiels dont vous avez besoin, sans limitation.'],
    ['Brieflee lets you search across its curated database of Belgian case law and articles of law, alongside approved external sources.', 'Brieflee vous permet de rechercher dans sa base de données sélectionnée de jurisprudence belge et d\'articles de loi, ainsi que dans des sources externes approuvées.'],
    ['You can search directly for specific documents or ask questions in a chat-style interface to receive tailored, source-backed answers. Find decisions by date or criteria, compare internal legal sources with online results, or search by voice, all grounded in verifiable legal material.', 'Vous pouvez rechercher directement des documents précis ou poser des questions via une interface de type chat pour obtenir des réponses sur mesure et étayées par des sources. Trouvez des décisions par date ou critères, comparez des sources juridiques internes aux résultats en ligne, ou recherchez à la voix, le tout fondé sur un contenu juridique vérifiable.'],
    ['Every answer, backed by real sources', 'Chaque réponse, étayée par de vraies sources'],
    ['Every legal statement in Brieflee is backed by real sources. You can inspect the exact passage, view it in full context, and open the original decision or article of law directly inside the platform.', 'Chaque affirmation juridique dans Brieflee est étayée par de vraies sources. Vous pouvez inspecter le passage exact, le voir en contexte complet et ouvrir la décision originale ou l\'article de loi directement dans la plateforme.'],
    ['Verify sources in full context', 'Vérifiez les sources en contexte complet'],
    ['When a legal statement is supported by a source, you can open the full decision or article of law and jump directly to the exact passage where the legal teaching is derived.', 'Lorsqu\'une affirmation juridique est appuyée par une source, vous pouvez ouvrir la décision complète ou l\'article de loi et aller directement au passage exact d\'où découle l\'enseignement juridique.'],
    ['“View in full text” takes you to the precise location in the original document, allowing you to read the reasoning in its full legal context.', '"View in full text" vous emmène à l\'emplacement précis dans le document original, afin de lire le raisonnement dans son contexte juridique complet.'],
    ['Compare Brieflee', 'Comparer Brieflee'],
    ['What makes Brieflee\'s Legal research better than the rest?', 'Qu\'est-ce qui rend la recherche juridique de Brieflee meilleure que le reste ?'],
    ['Brieflee is built around source-grounded legal research, where every statement can be verified directly against primary law.', 'Brieflee est conçu autour d\'une recherche juridique ancrée dans les sources, où chaque affirmation peut être vérifiée directement par rapport au droit primaire.'],
    ['Case law and articles of law, available in full text', 'Jurisprudence et articles de loi, disponibles en texte intégral'],
    ['Verification', 'Vérification'],
    ['Every statement linked to its exact legal source', 'Chaque affirmation liée à sa source juridique exacte'],
    ['Transparency', 'Transparence'],
    ['View the full decision and legal reasoning in context', 'Consultez la décision complète et le raisonnement juridique en contexte'],
    ['Lawyer remains responsible for judgment and use', 'L\'avocat reste responsable du jugement et de l\'usage'],
    ['Designed for real legal work and professional secrecy', 'Conçu pour le vrai travail juridique et le secret professionnel'],
    ['Often unclear or not inspectable', 'Souvent flou ou non vérifiable'],
    ['Answers cannot always be traced to primary law', 'Les réponses ne sont pas toujours traçables au droit primaire'],
    ['Limited or no access to original legal texts', 'Accès limité ou nul aux textes juridiques originaux'],
    ['Outputs require extra external verification', 'Les résultats exigent une vérification externe supplémentaire'],
    ['General information, not legal research', 'Information générale, pas recherche juridique'],
    ['Brieflee structures the back-and-forth reasoning, highlights weaknesses, and allows you to explore follow-up counter-arguments — helping you see the full legal picture of a case.', 'Brieflee structure le raisonnement contradictoire, met en évidence les faiblesses et vous permet d\'explorer des contre-arguments de suivi — pour vous donner une vision juridique complète du dossier.'],
    ['Ideal for complex cases involving multiple contracts, decisions, or factual developments across time.', 'Idéal pour les dossiers complexes impliquant plusieurs contrats, décisions ou évolutions factuelles dans le temps.'],
    ['The workflow tools fit well with how I actually prepare cases. I use them to analyze documents, identify important points, and work through arguments in a more structured way. It doesn’t replace my reasoning, but it supports it in a way that feels natural.', 'Les outils de workflow correspondent bien à ma manière réelle de préparer mes dossiers. Je les utilise pour analyser les documents, identifier les points importants et travailler les arguments de manière plus structurée. Cela ne remplace pas mon raisonnement, mais le soutient de façon naturelle.'],
    ['Turn research, arguments, and evidence into courtroom-ready documents.', 'Transformez recherche, arguments et preuves en documents prêts pour l\'audience.'],
    ['Brieflee structures facts, legal reasoning, and citations into clear drafts you can refine, edit, and export — always grounded in real legal sources.', 'Brieflee structure les faits, le raisonnement juridique et les citations en brouillons clairs que vous pouvez affiner, modifier et exporter — toujours ancrés dans de vraies sources juridiques.'],
    ['Everything you need to draft with confidence.', 'Tout ce qu\'il faut pour rédiger en toute confiance.'],
    ['Upload multiple documents — pleadings, contracts, correspondence — and let Brieflee generate structured, source-backed conclusions grounded in your full case file.', 'Importez plusieurs documents — conclusions, contrats, correspondances — et laissez Brieflee générer des conclusions structurées et étayées par des sources, fondées sur l\'ensemble de votre dossier.'],
    ['Import directly from your computer or integrate with SharePoint to work from the complete record.', 'Importez directement depuis votre ordinateur ou intégrez SharePoint pour travailler à partir du dossier complet.'],
    ['Before generating a conclusion, Brieflee builds a chronological timeline from all uploaded documents.', 'Avant de générer une conclusion, Brieflee construit une chronologie à partir de tous les documents importés.'],
    ['It identifies key events, detects gaps or missing files, and highlights what’s needed — so your draft is based on a complete and verified factual record.', 'Il identifie les événements clés, détecte les lacunes ou fichiers manquants, et met en évidence ce qui est nécessaire — afin que votre brouillon repose sur un dossier factuel complet et vérifié.'],
    ['What makes Brieflee\'s', 'Ce qui rend Brieflee'],
    ['better than the rest?', 'meilleur que le reste ?'],
    ['Brieflee drafts from structured case analysis, mapped arguments, and verified sources, preserving legal nuance and internal consistency across every section.', 'Brieflee rédige à partir d\'une analyse de dossier structurée, d\'arguments cartographiés et de sources vérifiées, en préservant la nuance juridique et la cohérence interne dans chaque section.'],
    ['Structured Case Intelligence', 'Intelligence de dossier structurée'],
    ['Grounded in structured legal analysis', 'Ancré dans une analyse juridique structurée'],
    ['Builds a verified timeline and flags gaps', 'Construit une chronologie vérifiée et signale les lacunes'],
    ['Every statement traced to its legal source', 'Chaque affirmation est reliée à sa source juridique'],
    ['Multi-Document Context', 'Contexte multi-document'],
    ['Synthesizes across your full case file', 'Synthétise l\'ensemble de votre dossier'],
    ['Argument & Counter-Argument Mapping', 'Cartographie des arguments & contre-arguments'],
    ['Maps weaknesses and generates counterarguments', 'Cartographie les faiblesses et génère des contre-arguments'],
    ['Starts from generic text generation', 'Part d\'une génération de texte générique'],
    ['No case chronology validation', 'Aucune validation de la chronologie du dossier'],
    ['References inserted without traceability', 'Références insérées sans traçabilité'],
    ['Limited to a single text input', 'Limité à une seule entrée texte'],
    ['No adversarial analysis or argument testing', 'Aucune analyse contradictoire ni test d\'arguments'],
    ['Add some disclaimer text here if necessary.', 'Ajoutez ici un texte de clause de non-responsabilité si nécessaire.'],
    ['for how lawyers', 'pour la manière dont les avocats'],
    ['Founding team', 'Équipe fondatrice'],
    ['Co-founder & COO', 'Cofondateur & COO'],
    ['Co-founder & CEO', 'Cofondateur & CEO'],
    ['Co-founder & Co-CTO', 'Cofondateur & Co-CTO'],
    ['We’re building the future of legal work.', 'Nous construisons l\'avenir du travail juridique.'],
    ['The people behind Brieflee', 'Les personnes derrière Brieflee'],
    ['Built by founders who understand legal work.', 'Conçu par des fondateurs qui comprennent le travail juridique.'],
    ['Brieflee is built by founders who have worked closely with lawyers and legal professionals and experienced firsthand how fragmented, slow, and opaque legal research and analysis can be.', 'Brieflee est construit par des fondateurs qui ont travaillé de près avec des avocats et professionnels du droit, et constaté de première main à quel point la recherche et l\'analyse juridiques peuvent être fragmentées, lentes et opaques.'],
    ['We’ve built startups before, worked with real users in production, and we’re now focused on one thing: creating a platform lawyers can rely on for serious work — grounded in law, not guesswork.', 'Nous avons déjà construit des startups, travaillé avec de vrais utilisateurs en production, et nous nous concentrons désormais sur une seule chose : créer une plateforme sur laquelle les avocats peuvent compter pour un travail sérieux — ancré dans le droit, pas dans l\'approximation.'],
    ['If you care about building tools that professionals actually trust and use, you’ll feel at home here.', 'Si vous aimez construire des outils que les professionnels utilisent et auxquels ils font vraiment confiance, vous vous sentirez ici chez vous.'],
    ['Trees planted by the Artifact team in 2025.', 'Arbres plantés par l\'équipe Artifact en 2025.'],
    ['Legal Engineer', 'Ingénieur juridique'],
    ['Brieflee brings structure to legal research, case analysis, and argument building — so you spend less time searching and more time strategizing.', 'Brieflee apporte de la structure à la recherche juridique, à l\'analyse de dossier et à la construction d\'arguments — pour que vous passiez moins de temps à chercher et plus de temps à élaborer votre stratégie.'],
    ['Automate routine research and document review. Let Brieflee handle the groundwork while you focus on higher-value, strategic work for your clients.', 'Automatisez la recherche de routine et la revue documentaire. Laissez Brieflee gérer le travail préparatoire pendant que vous vous concentrez sur un travail stratégique à plus forte valeur pour vos clients.'],
    ['Organization', 'Organisation'],
    ['Law firm, corporate legal department, or other organization', 'Cabinet d\'avocats, département juridique d\'entreprise ou autre organisation'],
    ['How did you hear about us?', 'Comment avez-vous entendu parler de nous ?'],
    ['Select an option', 'Sélectionnez une option'],
    ['Google search', 'Recherche Google'],
    ['Colleague or referral', 'Collègue ou recommandation'],
    ['Conference or event', 'Conférence ou événement'],
    ['Legal publication', 'Publication juridique'],
    ['I have read and agree to the', 'J\'ai lu et j\'accepte la'],
    ['. We will never share your information with third parties.', '. Nous ne partagerons jamais vos informations avec des tiers.'],
    ['Welcome to Artifact', 'Bienvenue sur Artifact'],
    ['Artifact is a premium software and SaaS template designed for SaaS startups, software companies, cloud AI tools and more.', 'Artifact est un template logiciel et SaaS premium conçu pour les startups SaaS, les entreprises logicielles, les outils d\'IA cloud, et plus encore.'],
    ['All killer, no filler.', 'Que du concret, sans superflu.'],
    ['Artifact is brimming with premium layouts and sections designed with true purpose.', 'Artifact regorge de mises en page premium et de sections conçues avec un vrai objectif.'],
    ['No copy-paste clones.', 'Aucun clone copié-collé.'],
    ['Hit the ground running with a variety of stylish pages to suit multiple purposes.', 'Démarrez immédiatement avec une variété de pages élégantes adaptées à de multiples usages.'],
    ['Build your own page layouts in moments with tons of hand-crafted sections.', 'Créez vos propres mises en page en quelques instants grâce à de nombreuses sections conçues à la main.'],
    ['Variables galore.', 'Des variables à profusion.'],
    ['Make site-wide design changes in seconds using Webflow variables.', 'Apportez des changements de design à l\'échelle du site en quelques secondes grâce aux variables Webflow.'],
    ['Figma file included', 'Fichier Figma inclus'],
    ['Take full control of the Artifact design', 'Prenez le contrôle total du design Artifact'],
    ['Frictionless customization.', 'Personnalisation sans friction.'],
    ['The Figma file matches Artifact’s Webflow variables, making your design workflow seamless.', 'Le fichier Figma correspond aux variables Webflow d\'Artifact, pour un workflow de design fluide.'],
    ['Prototype, polish, profit.', 'Prototypez, peaufinez, livrez.'],
    ['Impress clients sooner and streamline your path from concept to invoice.', 'Impressionnez vos clients plus tôt et fluidifiez votre parcours du concept à la facturation.'],
    ['General purpose', 'Usage général'],
    ['200+ Reviews', '200+ avis'],
    ['60+ Sections.', '60+ sections.'],
    ['Consumer focus', 'Orientation grand public'],
    ['Enterprise focus', 'Orientation entreprise'],
    ['Features pages', 'Pages fonctionnalités'],
    ['Software showcase', 'Vitrine logicielle'],
    ['Multipurpose', 'Polyvalent'],
    ['Our Technology', 'Notre technologie'],
    ['Showcase success', 'Mettre en avant les réussites'],
    ['Customer Story', 'Histoire client'],
    ['Static (Non e-com)', 'Statique (hors e-commerce)'],
    ['Webflow E-Commerce', 'Webflow e-commerce'],
    ['Request Demo', 'Demander une démo'],
    ['Lead Capture', 'Capture de leads'],
    ['Career Single', 'Fiche carrière'],
    ['with contact form', 'avec formulaire de contact'],
    ['Terms, Privacy etc.', 'Conditions, confidentialité, etc.'],
    ['Product deep-dive', 'Aperçu approfondi du produit']
  ]
};

const ATTR_REPLACEMENTS = {
  'nl-be': [
    ['placeholder="Your work email"', 'placeholder="Je zakelijke e-mailadres"'],
    ['placeholder="Email address"', 'placeholder="E-mailadres"'],
    ['placeholder="Search then hit enter"', 'placeholder="Zoek en druk op Enter"'],
    ['placeholder="Search…"', 'placeholder="Zoeken…"'],
    ['placeholder="you@company.com"', 'placeholder="jij@kantoor.be"'],
    ['value="Search"', 'value="Zoeken"'],
    ['value="Subscribe"', 'value="Abonneren"'],
    ['value="Send message"', 'value="Verstuur bericht"'],
    ['value="Request a demo"', 'value="Vraag een demo aan"'],
    ['data-wait="Please wait..."', 'data-wait="Even geduld..."'],
    ['aria-label="Language switcher"', 'aria-label="Taalkiezer"'],
    ['alt="Analyze faster"', 'alt="Analyseer sneller"'],
    ['alt="Research smarter"', 'alt="Onderzoek slimmer"'],
    ['alt="Argue stronger"', 'alt="Argumenteer sterker"'],
    ['alt="Draft seamlessly"', 'alt="Stel naadloos op"']
  ],
  'fr-be': [
    ['placeholder="Your work email"', 'placeholder="Votre e-mail professionnel"'],
    ['placeholder="Email address"', 'placeholder="Adresse e-mail"'],
    ['placeholder="Search then hit enter"', 'placeholder="Recherchez puis appuyez sur Entrée"'],
    ['placeholder="Search…"', 'placeholder="Rechercher…"'],
    ['placeholder="you@company.com"', 'placeholder="vous@cabinet.be"'],
    ['value="Search"', 'value="Rechercher"'],
    ['value="Subscribe"', 'value="S\'abonner"'],
    ['value="Send message"', 'value="Envoyer le message"'],
    ['value="Request a demo"', 'value="Demander une démo"'],
    ['data-wait="Please wait..."', 'data-wait="Veuillez patienter..."'],
    ['aria-label="Language switcher"', 'aria-label="Sélecteur de langue"'],
    ['alt="Analyze faster"', 'alt="Analysez plus vite"'],
    ['alt="Research smarter"', 'alt="Recherchez plus intelligemment"'],
    ['alt="Argue stronger"', 'alt="Argumentez plus solidement"'],
    ['alt="Draft seamlessly"', 'alt="Rédigez sans friction"']
  ]
};

const LEGAL_REVIEW_MARKER = '<!-- LEGAL REVIEW REQUIRED BEFORE PRODUCTION PUBLISH -->';

const LEGAL_ARTICLE_HTML = {
  'nl-be': `<div class="article w-richtext">
          <h5>1. Wie wij zijn</h5>
          <p>BZ Trade BV, handelend onder de naam Brieflee, biedt AI-ondersteunde tools voor juridisch onderzoek aan juridische professionals en rechtenstudenten in België en daarbuiten. Wij treden op als verwerkingsverantwoordelijke in de zin van Verordening (EU) 2016/679 (GDPR) en toepasselijke Belgische privacywetgeving.</p>
          <h5>2. Reikwijdte van dit beleid</h5>
          <p>Dit beleid legt uit welke persoonsgegevens wij verzamelen van gebruikers van de Dienst, waarom wij die verwerken, hoe lang wij die bewaren en welke rechten je onder de GDPR kunt uitoefenen. De Dienst is bedoeld voor juridische professionals en rechtenstudenten en is niet gericht op kinderen jonger dan 16 jaar.</p>
          <h5>3. Gegevens die wij verzamelen</h5>
          <p>Wij verzamelen de volgende categorieën persoonsgegevens. Tenzij anders vermeld, zijn deze gegevens nodig om de Dienst veilig te leveren.<br><br><strong>Accountgegevens:</strong> Naam, e-mailadres, telefoonnummer (door jou verstrekt, verplicht voor registratie).<br><br><strong>Facturatiegegevens:</strong> Adres, btw- of ondernemingsnummer (door jou verstrekt, enkel voor betalende plannen).<br><br><strong>Technische gegevens:</strong> IP-adres, browser of user-agent en serverlogs (automatisch verzameld, vereist voor beveiliging).<br><br><strong>Supportgegevens:</strong> Berichten die je naar support stuurt (door jou verstrekt, optioneel).<br><br>Wij verzamelen niet opzettelijk bijzondere categorieën van persoonsgegevens (artikel 9 GDPR), zoals gezondheids- of biometrische gegevens.</p>
          <h5>4. Doeleinden en rechtsgronden</h5>
          <p><strong>Je account aanbieden en beheren, log-ins authenticeren</strong> &mdash; Artikel 6(1)(b) GDPR (overeenkomst).<br><br><strong>Betalingen verwerken en factureren</strong> &mdash; Artikel 6(1)(b) en 6(1)(c) GDPR (overeenkomst en wettelijke verplichting).<br><br><strong>De Dienst onderhouden en beveiligen</strong> (debugging, fraude voorkomen) &mdash; Artikel 6(1)(f) GDPR (gerechtvaardigd belang).<br><br><strong>Reageren op supportverzoeken</strong> &mdash; Artikel 6(1)(b) GDPR (overeenkomst).<br><br><strong>Directe e-mailupdates over kritieke wijzigingen</strong> &mdash; Artikel 6(1)(f) GDPR (gerechtvaardigd belang, je kunt op elk moment bezwaar maken).<br><br><strong>Marketingnieuwsbrieven</strong> (indien aangeboden) &mdash; Artikel 6(1)(a) GDPR (toestemming, opt-in).</p>
          <h5>5. Delen en subverwerkers</h5>
          <p>Wij delen persoonsgegevens enkel wanneer dat nodig is om de Dienst te leveren:<br><br><strong>Amazon Web Services (AWS)</strong> &mdash; EU-regio (Ierland), voor cloudhosting en opslag.<br><br><strong>Stripe</strong> &mdash; betalingsverwerking voor betalende plannen.<br><br>Alle dienstverleners handelen op basis van schriftelijke verwerkersovereenkomsten conform artikel 28 GDPR.</p>
          <h5>6. Internationale doorgiften</h5>
          <p>Primaire gegevensopslag bevindt zich binnen de Europese Economische Ruimte. Indien een subverwerker buiten de EER opereert, vertrouwen wij op adequaatheidsbesluiten of op standaardcontractbepalingen (SCC\'s) om jouw gegevens te beschermen.</p>
          <h5>7. Bewaartermijnen</h5>
          <p><strong>Accountgegevens:</strong> bewaard zolang je account actief is plus 12 maanden na verwijdering om geschillen op te lossen.<br><br><strong>Facturatiegegevens:</strong> bewaard gedurende 7 jaar zoals vereist door de Belgische boekhoudwetgeving.<br><br><strong>Serverlogs:</strong> bewaard gedurende 6 maanden, tenzij langer nodig voor beveiligingsonderzoeken.</p>
          <h5>8. Beveiligingsmaatregelen</h5>
          <p>&bull; TLS-versleuteling tijdens transport en AES-256-versleuteling in rust op AWS.<br>&bull; Netwerksegmentatie, firewalls en regelmatige kwetsbaarheidsbeoordelingen.<br>&bull; Rolgebaseerde toegangscontroles met MFA voor medewerkers.<br>&bull; Geautomatiseerde back-ups en integriteitscontroles.</p>
          <h5>9. Jouw rechten</h5>
          <p>Je hebt recht op inzage, rectificatie, wissing, beperking of overdraagbaarheid van jouw persoonsgegevens, en op bezwaar tegen verwerking op basis van gerechtvaardigd belang. Voor selfservice-bewerkingen log je in op de Dienst en ga je naar Instellingen &rarr; Profiel. Om je account te verwijderen of andere rechten uit te oefenen, mail naar support@brieflee.be. Je kunt ook een klacht indienen bij de Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel.</p>
          <h5>10. Wijzigingen aan dit beleid</h5>
          <p>Wij kunnen dit beleid bijwerken naarmate onze praktijken evolueren. Wij informeren je via e-mail of in-app melding minstens 14 dagen voordat materiële wijzigingen ingaan als die impact hebben op jouw rechten.</p>
          ${LEGAL_REVIEW_MARKER}
        </div>`,
  'fr-be': `<div class="article w-richtext">
          <h5>1. Qui sommes-nous</h5>
          <p>BZ Trade BV, opérant sous le nom Brieflee, fournit des outils de recherche juridique assistés par l\'IA aux professionnels du droit et aux étudiants en droit en Belgique et au-delà. Nous agissons en tant que responsable du traitement au sens du Règlement (UE) 2016/679 (RGPD) et de la législation belge applicable en matière de protection de la vie privée.</p>
          <h5>2. Portée de cette politique</h5>
          <p>Cette politique explique les données personnelles que nous collectons auprès des utilisateurs du Service, pourquoi nous les traitons, combien de temps nous les conservons et les droits que vous pouvez exercer en vertu du RGPD. Le Service est destiné aux professionnels du droit et aux étudiants en droit et ne s\'adresse pas aux enfants de moins de 16 ans.</p>
          <h5>3. Données que nous collectons</h5>
          <p>Nous collectons les catégories suivantes de données personnelles. Sauf indication contraire, ces données sont nécessaires pour fournir le Service de manière sécurisée.<br><br><strong>Données de compte :</strong> Nom, adresse e-mail, numéro de téléphone (fournis par vous, obligatoires pour l\'inscription).<br><br><strong>Données de facturation :</strong> Adresse, numéro de TVA ou d\'entreprise (fournis par vous, collectés uniquement pour les offres payantes).<br><br><strong>Données techniques :</strong> Adresse IP, navigateur ou user-agent, et logs serveur (collectés automatiquement, requis pour la sécurité).<br><br><strong>Données de support :</strong> Messages envoyés au support (fournis par vous, optionnels).<br><br>Nous ne collectons pas intentionnellement de catégories particulières de données personnelles (article 9 RGPD), telles que les données de santé ou biométriques.</p>
          <h5>4. Finalités et bases juridiques</h5>
          <p><strong>Fournir et administrer votre compte, authentifier les connexions</strong> &mdash; Article 6(1)(b) RGPD (contrat).<br><br><strong>Traiter les paiements et la facturation</strong> &mdash; Article 6(1)(b) et 6(1)(c) RGPD (contrat et obligation légale).<br><br><strong>Maintenir et sécuriser le Service</strong> (débogage, prévention de la fraude) &mdash; Article 6(1)(f) RGPD (intérêt légitime).<br><br><strong>Répondre aux demandes de support</strong> &mdash; Article 6(1)(b) RGPD (contrat).<br><br><strong>Envoyer des mises à jour critiques par e-mail</strong> &mdash; Article 6(1)(f) RGPD (intérêt légitime, vous pouvez vous y opposer à tout moment).<br><br><strong>Newsletters marketing</strong> (si proposées) &mdash; Article 6(1)(a) RGPD (consentement, opt-in).</p>
          <h5>5. Partage et sous-traitance</h5>
          <p>Nous partageons les données personnelles uniquement lorsque cela est nécessaire pour fournir le Service :<br><br><strong>Amazon Web Services (AWS)</strong> &mdash; région UE (Irlande), pour l\'hébergement cloud et le stockage.<br><br><strong>Stripe</strong> &mdash; traitement des paiements pour les offres payantes.<br><br>Tous les prestataires interviennent sur la base d\'accords écrits de traitement des données conformes à l\'article 28 RGPD.</p>
          <h5>6. Transferts internationaux</h5>
          <p>Le stockage principal des données est situé dans l\'Espace économique européen. Si un sous-traitant opère en dehors de l\'EEE, nous nous appuyons sur des décisions d\'adéquation ou sur les clauses contractuelles types (CCT) afin de protéger vos données.</p>
          <h5>7. Conservation</h5>
          <p><strong>Données de compte :</strong> conservées tant que votre compte est actif, puis 12 mois après suppression afin de résoudre d\'éventuels litiges.<br><br><strong>Données de facturation :</strong> conservées pendant 7 ans conformément à la législation comptable belge.<br><br><strong>Logs serveur :</strong> conservés pendant 6 mois, sauf nécessité de conservation plus longue pour des enquêtes de sécurité.</p>
          <h5>8. Mesures de sécurité</h5>
          <p>&bull; Chiffrement TLS en transit et chiffrement AES-256 au repos sur AWS.<br>&bull; Segmentation réseau, pare-feux et revues régulières de vulnérabilité.<br>&bull; Contrôles d\'accès basés sur les rôles avec MFA pour le personnel.<br>&bull; Sauvegardes automatisées et contrôles d\'intégrité.</p>
          <h5>9. Vos droits</h5>
          <p>Vous avez le droit d\'accéder à vos données personnelles, de les rectifier, de les effacer, d\'en limiter le traitement, de les porter, et de vous opposer au traitement fondé sur l\'intérêt légitime. Pour les modifications en self-service, connectez-vous au Service puis rendez-vous dans Paramètres &rarr; Profil. Pour supprimer votre compte ou exercer d\'autres droits, écrivez à support@brieflee.be. Vous pouvez également introduire une plainte auprès de l\'Autorité de protection des données belge (Gegevensbeschermingsautoriteit), Rue de la Presse 35, 1000 Bruxelles.</p>
          <h5>10. Modifications de cette politique</h5>
          <p>Nous pouvons mettre à jour cette politique à mesure que nos pratiques évoluent. Nous vous informerons par e-mail ou via une notification in-app au moins 14 jours avant l\'entrée en vigueur de modifications substantielles si celles-ci affectent vos droits.</p>
          ${LEGAL_REVIEW_MARKER}
        </div>`
};

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizePairs(pairs) {
  const seen = new Set();
  const out = [];

  for (const pair of pairs) {
    const from = pair[0];
    const to = pair[1];
    if (!seen.has(from)) {
      seen.add(from);
      out.push([from, to]);
    }
  }

  return out;
}

function expandHtmlEntityVariants(pairs) {
  const out = [];
  for (const [from, to] of pairs) {
    out.push([from, to]);

    if (from.includes("'")) {
      out.push([from.replace(/'/g, '&#x27;'), to]);
    }
    if (from.includes('&')) {
      out.push([from.replace(/&/g, '&amp;'), to]);
    }
  }
  return out;
}

function validateReplacementCatalog(locale, textPairs, attrPairs) {
  const shortWhitelist = new Set([
    'Home',
    'Pages',
    'About',
    'Draft',
    'Login',
    'Search',
    'Argue',
    'Analyze',
    'Product',
    'Pricing',
    'Careers',
    'Overview',
    'Research',
    'Company',
    'Resources',
    'Customers',
    'Security',
    'Workflows',
    'Contact us',
    'Status Page',
    'Trust Center',
    'Search…',
    'Future',
    'Verification',
    'Transparency',
    'Organization',
    'Multipurpose'
  ]);

  const singleWordPattern = /^[\p{L}'’\-]+$/u;

  for (const [from] of textPairs) {
    if (from.trim() !== from) {
      throw new Error(`[${locale}] Replacement key contains leading/trailing spaces: "${from}"`);
    }

    if (from.length < 8 && !shortWhitelist.has(from)) {
      throw new Error(`[${locale}] Replacement key too short and not whitelisted: "${from}"`);
    }

    if (singleWordPattern.test(from) && from.length < 14 && !shortWhitelist.has(from)) {
      throw new Error(`[${locale}] Risky single-word replacement key: "${from}"`);
    }
  }

  for (const [from] of attrPairs) {
    if (from.trim() !== from) {
      throw new Error(`[${locale}] Attribute replacement key contains leading/trailing spaces: "${from}"`);
    }
  }
}

function sortByFromLengthDesc(pairs) {
  return [...pairs].sort((a, b) => b[0].length - a[0].length);
}

function applyStringReplacements(input, replacements) {
  let output = input;
  for (const [from, to] of replacements) {
    output = output.split(from).join(to);
  }
  return output;
}

function translateTextNodes(html, replacements) {
  const tokens = html.split(/(<[^>]+>)/g);
  let inScript = false;
  let inStyle = false;

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token.startsWith('<')) {
      const lower = token.toLowerCase();
      if (lower.startsWith('<script')) inScript = true;
      if (lower.startsWith('</script')) inScript = false;
      if (lower.startsWith('<style')) inStyle = true;
      if (lower.startsWith('</style')) inStyle = false;
      continue;
    }

    if (inScript || inStyle) continue;

    let text = token;
    for (const [from, to] of replacements) {
      text = text.split(from).join(to);
    }
    tokens[i] = text;
  }

  return tokens.join('');
}

function upsertTag(html, matcher, replacement, fallbackAnchorRegex) {
  if (matcher.test(html)) {
    return html.replace(matcher, replacement);
  }

  const anchor = html.match(fallbackAnchorRegex);
  if (!anchor) return html;

  const idx = anchor.index + anchor[0].length;
  return `${html.slice(0, idx)}\n  ${replacement}${html.slice(idx)}`;
}

function upsertMetaTag(html, key, value, content) {
  const escapedContent = content.replace(/"/g, '&quot;');
  const matcher = new RegExp(`<meta[^>]*${key}="${escapeRegExp(value)}"[^>]*>`, 'i');
  const replacement = `<meta content="${escapedContent}" ${key}="${value}">`;
  return upsertTag(html, matcher, replacement, /<title>[\s\S]*?<\/title>/i);
}

function upsertTitle(html, title) {
  const escaped = title.replace(/"/g, '&quot;');
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escaped}</title>`);
  }

  return html;
}

function ensureHtmlLang(html, htmlLang) {
  return html.replace(/<html([^>]*?)lang="[^"]*"([^>]*)>/i, `<html$1lang="${htmlLang}"$2>`);
}

function ensureLocaleMetaBlock(html, file, locale) {
  const stripOld = html.replace(/\n\s*<!-- brieflee-locale-meta:start -->[\s\S]*?<!-- brieflee-locale-meta:end -->\n?/g, '\n');

  const isIndex = file === 'index.html';
  const en = isIndex ? '/' : `/${file}`;
  const nl = isIndex ? '/nl-be/' : `/nl-be/${file}`;
  const fr = isIndex ? '/fr-be/' : `/fr-be/${file}`;

  const canonical = locale === 'en' ? en : locale === 'nl-be' ? nl : fr;

  const block = [
    '<!-- brieflee-locale-meta:start -->',
    `  <link rel="canonical" href="${canonical}">`,
    `  <link rel="alternate" hreflang="en" href="${en}">`,
    `  <link rel="alternate" hreflang="nl-BE" href="${nl}">`,
    `  <link rel="alternate" hreflang="fr-BE" href="${fr}">`,
    `  <link rel="alternate" hreflang="x-default" href="${en}">`,
    '<!-- brieflee-locale-meta:end -->'
  ].join('\n');

  const viewportRegex = /<meta[^>]*name="viewport"[^>]*>/i;
  const viewportMatch = stripOld.match(viewportRegex);
  if (!viewportMatch) return stripOld;

  const idx = viewportMatch.index + viewportMatch[0].length;
  return `${stripOld.slice(0, idx)}\n  ${block}${stripOld.slice(idx)}`;
}

function ensureLangScripts(html, localized) {
  const prefix = localized ? '../' : '';
  let next = html;

  const mapTag = `<script src="${prefix}js/lang-map.js" type="text/javascript"></script>`;
  const switcherTag = `<script src="${prefix}js/lang-switcher.js" type="text/javascript"></script>`;

  if (!next.includes(mapTag)) {
    next = next.replace(/<\/body>/i, `  ${mapTag}\n</body>`);
  }

  if (!next.includes(switcherTag)) {
    next = next.replace(/<\/body>/i, `  ${switcherTag}\n</body>`);
  }

  return next;
}

function stripLangScripts(html) {
  return html
    .replace(/\s*<script src="(?:\.\.\/)?js\/lang-map\.js" type="text\/javascript"><\/script>\s*/gi, '\n')
    .replace(/\s*<script src="(?:\.\.\/)?js\/lang-switcher\.js" type="text\/javascript"><\/script>\s*/gi, '\n');
}

function rewriteLocalizedPaths(html) {
  let next = html;

  next = next.replace(/(href|src)="(css|js|images|fonts)\//g, '$1="../$2/');
  next = next.replace(/srcset="images\//g, 'srcset="../images/');
  next = next.replace(/,\s*images\//g, ', ../images/');

  const localizedSet = new Set(CORE_PAGES);

  next = next.replace(/href="(?!https?:\/\/|mailto:|tel:|#|\/|\.\.\/)([^"?#]+\.html)(#[^"]*)?"/g, (match, file, hash = '') => {
    if (localizedSet.has(file)) return `href="${file}${hash}"`;
    return `href="../${file}${hash}"`;
  });

  return next;
}

function ensureCustomCss(html, localized) {
  const href = `${localized ? '../' : ''}css/brieflee-custom.css`;
  const tag = `<link href="${href}" rel="stylesheet" type="text/css">`;
  if (/href="(?:\.\.\/)?css\/brieflee-custom\.css"/i.test(html)) return html;

  if (/<link[^>]*mega-menu\.css[^>]*>/i.test(html)) {
    return html.replace(/(<link[^>]*mega-menu\.css[^>]*>)/i, `$1\n  ${tag}`);
  }

  if (/<link[^>]*brieflee\.webflow\.css[^>]*>/i.test(html)) {
    return html.replace(/(<link[^>]*brieflee\.webflow\.css[^>]*>)/i, `$1\n  ${tag}`);
  }

  return html;
}

function fixLegacyLinks(html, localized) {
  if (localized) {
    return html
      .split('href="../overview.html"').join('href="index.html"')
      .split('href="../analyze.html"').join('href="workflows.html"')
      .split('href="../argue.html"').join('href="workflows.html"')
      .split('href="overview.html"').join('href="index.html"')
      .split('href="analyze.html"').join('href="workflows.html"')
      .split('href="argue.html"').join('href="workflows.html"');
  }

  return html
    .split('href="overview.html"').join('href="detail_product.html"')
    .split('href="analyze.html"').join('href="workflows.html"')
    .split('href="argue.html"').join('href="features-1.html"');
}

function applyPageMetadata(html, file, locale) {
  const meta = PAGE_META[locale]?.[file];
  if (!meta) return html;

  let next = html;
  next = upsertTitle(next, meta.title);
  next = upsertMetaTag(next, 'name', 'description', meta.description);
  next = upsertMetaTag(next, 'property', 'og:title', meta.title);
  next = upsertMetaTag(next, 'property', 'og:description', meta.description);
  next = upsertMetaTag(next, 'property', 'twitter:title', meta.title);
  next = upsertMetaTag(next, 'property', 'twitter:description', meta.description);
  return next;
}

function injectLegalArticle(html, locale, file) {
  if (file !== 'legal.html' || !LEGAL_ARTICLE_HTML[locale]) return html;

  const startMarker = '<div class="article w-richtext">';
  const start = html.indexOf(startMarker);
  if (start === -1) return html;

  const closingMarker = '</div>\n      </div>\n    </div>\n  </section>';
  const closeStart = html.indexOf(closingMarker, start);
  if (closeStart === -1) return html;

  const articleCloseEnd = closeStart + '</div>'.length;
  return `${html.slice(0, start)}${LEGAL_ARTICLE_HTML[locale]}${html.slice(articleCloseEnd)}`;
}

function processEnglishRoot() {
  for (const file of CORE_PAGES) {
    const full = path.join(ROOT, file);
    let html = fs.readFileSync(full, 'utf8');
    html = ensureHtmlLang(html, 'en');
    html = ensureLocaleMetaBlock(html, file, 'en');
    html = ensureCustomCss(html, false);
    html = fixLegacyLinks(html, false);
    html = stripLangScripts(html);
    html = ensureLangScripts(html, false);
    fs.writeFileSync(full, html, 'utf8');
  }
}

function processLocalized(locale) {
  const dir = path.join(ROOT, locale);
  fs.mkdirSync(dir, { recursive: true });

  const textPairs = sortByFromLengthDesc(
    normalizePairs(expandHtmlEntityVariants(TEXT_REPLACEMENTS[locale] || []))
  );
  const attrPairs = sortByFromLengthDesc(normalizePairs(ATTR_REPLACEMENTS[locale] || []));
  validateReplacementCatalog(locale, textPairs, attrPairs);

  for (const file of CORE_PAGES) {
    const source = path.join(ROOT, file);
    const dest = path.join(dir, file);
    let html = fs.readFileSync(source, 'utf8');

    html = ensureHtmlLang(html, LOCALES[locale].htmlLang);
    html = ensureLocaleMetaBlock(html, file, locale);
    html = ensureCustomCss(html, true);
    html = stripLangScripts(html);
    html = rewriteLocalizedPaths(html);
    html = fixLegacyLinks(html, true);
    html = ensureLangScripts(html, true);
    html = applyPageMetadata(html, file, locale);

    html = translateTextNodes(html, textPairs);
    html = applyStringReplacements(html, attrPairs);
    html = injectLegalArticle(html, locale, file);

    fs.writeFileSync(dest, html, 'utf8');
  }
}

processEnglishRoot();
processLocalized('nl-be');
processLocalized('fr-be');

console.log('Locale generation complete for:', CORE_PAGES.length, 'pages x 2 locales.');
