// Tip calculator app
const app = new Vue({
    el: '#calculator_app',
    data: {
        languages: Object.keys(translations),
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
        toggleLangDropdown: function (e, close = false) {
            const select_lang = document.querySelector('.select-lang')
            if (select_lang.classList.contains('open') ||
                (close && select_lang !== e.target && !select_lang.contains(e.target))) {
                select_lang.classList.remove('open')
            } else {
                select_lang.classList.add('open')
            }
        },
        setLang : function (_lang) {
            this.lang = _lang
            document.querySelector('.select-lang').classList.remove('open')
        },
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