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
        toggleLangDropdown: function () {
            const select_lang = document.querySelector('.select-lang')
            if (select_lang.classList.contains('open')) {
                select_lang.classList.remove('open')
            } else {
                select_lang.classList.add('open')
            }
        },
        toggleAttribution: function () {
            const attribution_toggle = document.querySelector('.attribution__toggle')
            const attribution_content = document.querySelector('.attribution')

            if (attribution_toggle.classList.contains('active')) {
                attribution_toggle.classList.remove('active')
                attribution_content.classList.remove('active')
            } else {
                attribution_toggle.classList.add('active')
                attribution_content.classList.add('active')
            }
        },
        closeDropdowns: function (e) {
            const select_lang = document.querySelector('.select-lang')
            if (select_lang !== e.target && !select_lang.contains(e.target)) {
                select_lang.classList.remove('open')
            }

            const attribution_toggle = document.querySelector('.attribution__toggle')
            const attribution_content = document.querySelector('.attribution')
            if (e.target !== attribution_content && !attribution_content.contains(e.target) &&
                e.target !== attribution_toggle && !attribution_toggle.contains(e.target) ) {
                attribution_toggle.classList.remove('active')
                attribution_content.classList.remove('active')
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
            const _tip = Number(this.custom_tip ? this.custom_tip : this.tip)
            const result = Number((Number(this.bill) / 100 * _tip / Number(this.people)).toFixed(2))

            if (isNaN(result) || result < 0) return this.currency + 0
            return this.currency + result
        },
        total_per_person: function () {
            const _tip = Number(this.custom_tip ? this.custom_tip : this.tip)
            const result = Number((Number(this.bill) / 100 * _tip / Number(this.people) + Number(this.bill) / Number(this.people)).toFixed(2))

            if (isNaN(result) || result < 0 || result === Infinity) return this.currency + 0
            return this.currency + result
        },
        is_rtl: function () {
            return this.lang === 'ar'
        }
    },
})
