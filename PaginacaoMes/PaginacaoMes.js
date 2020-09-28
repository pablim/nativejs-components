import defineElement from 'netivejs-comopnent-helper/componentHelper'

defineElement({
    name: "jls-paginacao-mes",
    templateId: "paginacao_mes_template",
    templateFile: "PaginacaoMes/PaginacaoMes.html",
    init: function (component) {
        debugger
        let url = component.getAttribute("url")
        let callback = component.getAttribute("callback")
        let year = component.getAttribute("ano")
        let monthYear = component.getAttribute("mes-extenso")

        component.setInnerElement("#botao_mes_ano", monthYear)

        let meses = component.getElements(".mes-btn")
        let botaoMesAno = component.getElement("#botao_mes_ano")

        let previousYear = parseInt(year)-1
        let nextYear = parseInt(year)+1
        
        let previousYearBtn = component.getElement(".previous-year")
        let nextYearBtn = component.getElement(".next-year")

        previousYearBtn.innerHTML = previousYear
        nextYearBtn.innerHTML = nextYear

        for (var i in meses) {
            try {
                let month = meses[i].dataset.numeroMes
                let params = {year, month}
                meses[i].onclick = function (e) {
                    component.definition.methods.paginate(url, params, callback)
                }
            } catch (e) {
                continue
            }
        }

        botaoMesAno.onclick = function () {
            component.definition.methods.selectAnoMes(component)
        }
    },
    props: {
        
    },
    templateBinds: {
        previous_btn: {
            onclick: function (e) {
                let url = this.getAttribute("url")
                let sendParamsCallback = this.getAttribute("send-params-callback")
                let callback = this.getAttribute("callback")
                let year = this.getAttribute("ano")
                let month = this.getAttribute("mes")

                let previousMonth = (month == 1) ? 12 : month - 1
                let previousYear = (month == 1) ? year-1: year
                
                let params = {}
                if (sendParamsCallback)
                    params = window[sendParamsCallback]()

                params["month"] = previousMonth
                params["year"] = previousYear

                this.definition.methods.paginate(url, params, callback)
            }
        },
        next_btn: {
            onclick: function (e) {
                let url = this.getAttribute("url")
                let sendParamsCallback = this.getAttribute("send-params-callback")
                let callback = this.getAttribute("callback")
                let year = parseInt(this.getAttribute("ano"))
                let month = parseInt(this.getAttribute("mes"))

                let nextMonth = (month == 12) ? 1 : month + 1
                let nextYear = (month == 12) ? year + 1: year

                let params = {}
                if (sendParamsCallback)
                    params = window[sendParamsCallback]()
                
                params["month"] = nextMonth
                params["year"] = nextYear

                this.definition.methods.paginate(url, params, callback)
            }
        },
        next_year_btn: {
            onclick: function (e) {
                let url = this.getAttribute("url")
                let callback = this.getAttribute("callback")
                let year = this.getAttribute("ano")
                let month = this.getAttribute("mes")
        
                let nextYear = parseInt(year)+1
        
                let nextYearParams = {month, "year":nextYear}
                this.definition.methods.paginate(url, nextYearParams, callback)
            }
        },
        previous_year_btn: {
            onclick: function(e) {
                let url = this.getAttribute("url")
                let callback = this.getAttribute("callback")
                let year = this.getAttribute("ano")
                let month = this.getAttribute("mes")
    
                let previousYear = parseInt(year)-1
        
                let previousYearParams = {month, "year":previousYear}
                this.definition.methods.paginate(url, previousYearParams, 
                    callback)
            }
        }
        
    },
    methods: {
        paginate: function (url, params, callback) {
            ajaxRequestHTML(url, 
                params, 
                null, 
                function (data) {
                    window[callback](data)
                },
                function (jqXHR, textResponse) {
                    console.log("erro paginacao mes")
                })
        },
        selectAnoMes: function (component) {
            debugger
            let anoMesContainer = component.getElement("#ano_mes_container")
            let anoMesBtn = component.getElement("#botao_mes_ano")

            $(anoMesContainer).toggleClass("w3-hide")
    
            let width = $(anoMesContainer).width();
            let width2 = $(anoMesBtn).outerWidth();
    
            $(anoMesContainer).width(width2);
    
            let top = $(anoMesBtn).offset().top
            let left = $(anoMesBtn).offset().left
            
            $(anoMesContainer).css({
                left:left, top:top,
            })
        }
    }
})