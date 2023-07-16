class CustomSeat {
    constructor() {
        this.options = [
            // Side Color
            {
                label: 'Side Color',
                id: 'select-side-color',
                category: 'side-color',
                options: [
                    { price: 10, img: 1, text: 'Black' },
                    { price: 10, img: 2, text: 'Dark Grey' },
                    { price: 10, img: 3, text: 'Light Grey' },
                    { price: 10, img: 4, text: 'White' },
                    { price: 15, img: 5, text: 'Red' },
                    { price: 15, img: 6, text: 'Pink' },
                    { price: 15, img: 7, text: 'Purple' },
                    { price: 15, img: 8, text: 'Orange' },
                    { price: 15, img: 9, text: 'Yellow' },
                    { price: 15, img: 10, text: 'Green' },
                    { price: 15, img: 11, text: 'Sky Blue' },
                    { price: 15, img: 12, text: 'Dark Blue' },
                    { price: 15, img: 13, text: 'Navy' },
                    { price: 15, img: 14, text: 'Tan' },
                ]
            },

            // Top Color
            {
                label: 'Top Color',
                id: 'select-top-color',
                category: 'top-color',
                options: [
                    { price: 10, img: 1, text: 'Red' },
                    { price: 10, img: 2, text: 'Black' },
                    { price: 10, img: 3, text: 'Dark Grey' },
                    { price: 10, img: 4, text: 'Light Grey' },
                    { price: 15, img: 5, text: 'White' },
                    { price: 15, img: 6, text: 'Pink' },
                    { price: 15, img: 7, text: 'Purple' },
                    { price: 15, img: 8, text: 'Orange' },
                    { price: 15, img: 9, text: 'Yellow' },
                    { price: 15, img: 10, text: 'Green' },
                    { price: 15, img: 11, text: 'Sky Blue' },
                    { price: 15, img: 12, text: 'Dark Blue' },
                    { price: 15, img: 13, text: 'Navy' },
                    { price: 15, img: 14, text: 'Tan' },
                ]
            },

            // Rib Color
            {
                label: 'Rib Color',
                id: 'select-rib-color',
                category: 'rib-color',
                options: [
                    { price: 10, img: 1, text: 'Black' },
                    { price: 10, img: 2, text: 'Dark Grey' },
                    { price: 10, img: 3, text: 'Light Grey' },
                    { price: 10, img: 4, text: 'White' },
                    { price: 15, img: 5, text: 'Red' },
                    { price: 15, img: 6, text: 'Pink' },
                    { price: 15, img: 7, text: 'Purple' },
                    { price: 15, img: 8, text: 'Orange' },
                    { price: 15, img: 9, text: 'Yellow' },
                    { price: 15, img: 10, text: 'Green' },
                    { price: 15, img: 11, text: 'Sky Blue' },
                    { price: 15, img: 12, text: 'Dark Blue' },
                    { price: 15, img: 13, text: 'Navy' },
                    { price: 15, img: 14, text: 'Tan' },
                    { price: 25, img: 15, text: 'Gold' },
                ]
            },
            
            // Tall Seat Cover
            {
                label: 'Tall Seat Cover',
                id: 'select-seat-cover',
                category: 'seat-cover',
                options: [
                    { price: 0, text: 'No' },
                    { price: 5, text: 'Yes (+$5)' },
                ]
            },

            // Knee Brace Reinforcement
            {
                label: 'Knee Brace Reinforcement',
                id: 'select-knee-brace',
                category: 'knee-brace',
                options: [
                    { price: 0, text: 'No' },
                    { price: 10, text: 'Yes (+$10)' },
                ]
            },

            // Custom Front Patch
            {
                label: 'Custom Front Patch',
                id: 'select-front-patch',
                category: 'front-patch',
                options: [
                    { price: 0, text: 'No' },
                    { price: 10, text: 'Yes (+$10)' },
                ]
            },

            // Custom Side Patches
            {
                label: 'Custom Side Patches',
                id: 'select-side-patch',
                category: 'side-patch',
                options: [
                    { price: 0, text: 'No' },
                    { price: 15, text: 'Yes (+$15)' },
                ]
            },

            // Quantity
            {
                label: 'Quantity',
                id: 'select-seat-qty',
                category: 'seat-qty',
                options: [
                    { multiplier: 1, text: '1' },
                    { multiplier: 2, text: '2' },
                ]
            },
        ];

        this.customSeatOptionsContainer = document.getElementById('custom-seat-options');
        this.customSeatPriceElement = document.getElementById('custom-seat-price');

        this.populateOptions();
        this.bindChangeEvents();
        this.update();
    }

    //
    populateOptions() {
        this.options.forEach(option => {
            const selectElement = document.getElementById(option.id);

            if (selectElement) {
                option.options.forEach(opt => {
                    let newOption = document.createElement('option');
                    newOption.text = opt.text;
                    newOption.dataset.price = opt.price;
                    newOption.dataset.img = opt.img;
                    newOption.dataset.category = option.category;

                    if ('multiplier' in opt) {
                        newOption.dataset.multiplier = opt.multiplier;
                    }

                    selectElement.add(newOption);
                });
            }
        });
    }

    //
    getTotal() {
        const multiplier = parseInt(this.getInputDataset('select-seat-qty').multiplier) || 1;

        return this.getInputs().reduce((accumulator, input) => {
            const price = parseFloat(this.getInputDataset(input).price) || 0;
            return accumulator + price;
        }, 0) * multiplier;
    }

    //
    updateImages() {
        this.getInputs().forEach(input => {
            const dataset = this.getInputDataset(input);
            if (dataset.category && dataset.img) {
                const imgElement = document.getElementById(dataset.category);
                if (imgElement) {
                    imgElement.src = `img/${dataset.category}/${dataset.img}.jpg`;
                }
            }
        });
    }

    //
    updatePrice() {
        this.customSeatPriceElement.textContent = this.getTotal();
    }

    //
    getInputDataset(input) {
        const select = document.getElementById(input);
        return select.options[select.selectedIndex].dataset;
    }

    //
    update() {
        this.updatePrice();
        this.updateImages();
    }

    //
    bindChangeEvents() {
        this.getInputs().forEach(input => {
            const selectElement = document.getElementById(input);
            if (selectElement) {
                selectElement.addEventListener('change', () => {
                    this.update();
                });
            }
        });
    }

    //
    getInputs() {
        return [
            'select-side-color',
            'select-top-color',
            'select-rib-color',
            'select-seat-cover',
            'select-knee-brace',
            'select-front-patch',
            'select-side-patch',
            'select-seat-qty',
        ];
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.customSeat = new CustomSeat();
});
