function toggleStatus(circleElement){
    circleElement.classList.toggle("full");
    const row = circleElement.closest("tr");
    row.classList.toggle("completed");
}