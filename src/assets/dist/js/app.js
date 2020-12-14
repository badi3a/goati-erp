class ModalLoad {


    constructor(element) {
        if (element === null) {
            return
        }

        this.pagination = $(".js-filter-pagination");
        this.content = $(".js-filter-content");
        this.sorting = $(".js-filter-sorting");
        this.total = $(".js-filter-total");
        this.form = $(".js-filter-form");
        this.bindEvents();


    }


    bindEvents() {
        let self = this;
        this.sorting.click(function (event) {
            let target = $(event.target);
            if (target.is("a")) {
                event.preventDefault();
                self.loadUrl(target.attr("href"));
            }

        });

        this.form.find('input').each(function (index) {
            $(this).on('input', function () {
                self.loadForm();
            })

        });
    }

    async loadForm() {

        const data = this.form.serialize();
        const url = this.form.attr('action') !== undefined ? this.form.attr('action') : (window.location.href);
        console.log("change");
        console.log("url  : " + url);
        console.log("data : " + data);
        return this.loadUrl(url + '?' + data);

    }


    async loadUrl(url) {
        const ajaxUrl =  url + '&ajax=1';
        const response = await fetch(ajaxUrl, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            this.content.html(data.content);
            this.sorting.html(data.sorting);
            this.total.html(data.total);
            this.pagination.html(data.pagination);
            history.replaceState({}, '', url)
        } else {
            console.error(response)
        }
    }


}


const
    filter = new ModalLoad($(".js-filter"));


