sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {
                
                let ImageList = {
                    Imagens : [ ]
                };

                //criação do modelo para exibir dados na tela
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");

            },
            onPressBuscar: function(){
                //instancia objeto input na variavel
                let inputBusca = this.byId("inpBusca");
                // coleta o valor digitado no input
                let query = inputBusca.getValue();

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" +query+ "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "0c97e0d3b5mshc1c796d177e8d52p15fa43jsn638919f38cdd",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();

                    // clear tabela interna = array
                    oDadosImage.Imagens = [];

                    //loop que adiciona dados de uma tabela em outra tabela
                    let listaResultado = response.value;
                    let newItem;

                    listaResultados.forEach(element => {
                        newItem = element;
                    //vamos ao loop
                    //for (var i = 0; i < listaResultados.length; i++){
                        //read table pelo indice
                        //newItem = listaResultados[i];
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    
                    });
                    oImageModel.refresh();

                }.bind(this)
                );

            }
        });
    });
