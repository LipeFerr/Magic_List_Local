document.addEventListener('DOMContentLoaded', function () {
    const filterLabels = document.querySelectorAll('.filter-label');

    filterLabels.forEach(label => {
        label.addEventListener('click', function () {
            console.log('Clicou no rótulo de filtro');

            const toggleId = this.dataset.toggle;
            const colorTypeFilter = document.querySelector(`.color-type-filter[data-toggle="${toggleId}"]`);

            if (colorTypeFilter) {
                colorTypeFilter.classList.toggle('active');
                label.classList.toggle('expanded');
            }
        });
    });
});
