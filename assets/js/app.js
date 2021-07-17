const translations = {
    en: {
        bill: 'Bill',
        how_much_is_your_bill: 'How much is your bill?',
        your_bill: 'Your bill',
        select_tip: 'Select tip %',
        must_be_numeric: 'Must be numeric',
        cant_be_zero: 'Can\'t be zero',
        cant_be_negative: 'Can\'t be negative',
        add_tip: 'Add a {{1}}% tip',
        add_custom_tip: 'Add a custom Tip',
        custom: 'Custom',
        number_of_people: 'Number of people',
        how_many_people: 'How many people ?',
        how_many_people_are_you: 'How many people are you ?',
        can_you_divide_people: 'Can you divide people ?',
        tip_amount: 'Tip amount',
        total: 'Total',
        per_person: '/ person',
        reset: 'Reset',
        reset_informations: 'Reset informations',
        click_to_open_attribute: 'Click to open informations',
        challenge_by: 'Challenge by',
        coded_by: 'Coded by'
    },
    fr: {
        bill: 'Facture',
        how_much_is_your_bill: 'Montant de la facture?',
        your_bill: 'Votre facture',
        select_tip: 'Choisir le pourboire %',
        must_be_numeric: 'Doit être un nombre',
        cant_be_zero: 'Ne peut pas être zéro',
        cant_be_negative: 'Ne peut pas être négatif',
        add_tip: 'Ajouter un pourboire de {{1}}%',
        add_custom_tip: 'Ajouter un pourboire personnalisé',
        custom: 'Autre',
        number_of_people: 'Nombre de personnes',
        how_many_people: 'Combien êtes-vous ?',
        how_many_people_are_you: 'Combien de personnes êtes-vous ?',
        can_you_divide_people: 'Vous pouvez divisez les gens ?',
        tip_amount: 'Montant du pourboire',
        total: 'Total',
        per_person: '/ personne',
        reset: 'Remise à zéro',
        reset_informations: 'Reset informations',
        click_to_open_attribute: 'Cliquez pour ouvrir les informations',
        challenge_by: 'Challenge par',
        coded_by: 'Programmé par'
    }
}


// Tip calculator app
const app = new Vue({
    el: '#calculator_app',
    data: {
        lang: 'fr',
        translations: translations,
        currency: '$',
        static_tips: [5, 10, 15, 25, 50],
        tip: null,
        custom_tip: null,
        bill: null,
        people: null,
    },
    methods: {
        setTip: function (value) {
            this.custom_tip = null
            this.tip = Number(value)
        },
        reset: function () {
            this.tip = this.custom_tip = this.bill = this.people = null
        },
        translate: function (text, values = []) {
            let str = translations[this.lang][text] || ''
            for (let n = 0; n < values.length; n ++) {
                str = str.replace('{{' + (n + 1) + '}}', values[n])
            }

            return str
        }
    },
    computed: {
        tip_per_person: function () {
            if (!this.bill || isNaN(this.bill) || !this.people || isNaN(this.people)) return 0

            const _tip = Number(this.custom_tip ? this.custom_tip : this.tip)
            return this.currency + (Number(this.bill) / 100 * _tip / Number(this.people)).toFixed(2)
        },
        total_per_person: function () {
            if (!this.bill || isNaN(this.bill) || !this.people || isNaN(this.people)) return 0

            const _tip = Number(this.custom_tip ? this.custom_tip : this.tip)
            return this.currency + (Number(this.bill) / 100 * _tip / Number(this.people) + Number(this.bill) / Number(this.people)).toFixed(2)
        },
    }
})

// Attribution toggle
const attribution_toggle = document.querySelector('.attribution__toggle')
const attribution_content = document.querySelector('.attribution')
attribution_toggle.addEventListener('click', function (e) {
    e.preventDefault()

    if (attribution_toggle.classList.contains('active')) {
        attribution_toggle.classList.remove('active')
        attribution_content.classList.remove('active')
    } else {
        attribution_toggle.classList.add('active')
        attribution_content.classList.add('active')
    }
})

document.body.addEventListener('click', function (e) {
    if (e.target === attribution_content || attribution_content.contains(e.target) ||
        e.target === attribution_toggle || attribution_toggle.contains(e.target) ) return false

    attribution_toggle.classList.remove('active')
    attribution_content.classList.remove('active')
})