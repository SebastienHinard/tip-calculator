// Tip calculator app
const app = new Vue({
    el: '#calculator_app',
    data: {
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
        }
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