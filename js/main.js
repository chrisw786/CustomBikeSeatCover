class CustomSeat {
    getTotal() {
        return this.getInputs().reduce((accumulator, input) => {
            let price = this.getInputDataset(input).price;
            return accumulator + parseFloat(price);
        }, 0)
    }

    updateImages() {
        return this.getInputs().forEach(input => {
            let dataset = this.getInputDataset(input);
            if(dataset.category && dataset.img) {
                document.getElementById(dataset.category).src = "/img/" + dataset.category + "/" + dataset.img + ".jpg";
            }
        })
    }

    updatePrice() {
        document.getElementById('custom-seat-price').innerHTML = this.getTotal();
    }

    getInputDataset(input) {
        let select = document.getElementById(input);
        return select.options[select.selectedIndex].dataset
    }

    update() {
        // update price
        this.updatePrice();
        // update image
        this.updateImages();
    }

    bindChangeEvents() {
        this.getInputs().forEach(input => {
            document.getElementById(input).onchange = () => {
                this.update();
            }
        })
    }

    getInputs() {
        return [
            'select-side-color',
            'select-top-color',
            'select-rib-color',
            'select-seat-cover',
            'select-knee-brace',
            'select-front-patch',
            'select-side-patch',
        ]
    }
}

window.onload = function() {
    window.customSeat = new CustomSeat();
    window.customSeat.bindChangeEvents();
    window.customSeat.update();
}
