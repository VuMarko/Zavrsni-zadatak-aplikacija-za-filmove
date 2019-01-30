var LS = {
    init: function (imeStavke) {
        var trenutno = localStorage.getItem(imeStavke);
        if (trenutno == null) {
            localStorage.setItem(imeStavke, '{}');
        }
    }, set: function (imeStavke, item) { // LS.set('prvi',{a:5,b:7});
        localStorage.setItem(imeStavke, JSON.stringify(item));
    }, get: function (imeStavke) {
        return JSON.parse(localStorage.getItem(imeStavke));
    }, remove: function (imeStavke) {
        localStorage.removeItem(imeStavke);
    }, setElement: function (imeStavke, imeKljuca, vrednost) {
        var trenutno = this.get(imeStavke);
        trenutno[imeKljuca] = vrednost;
        this.set(imeStavke, trenutno);
    }, getElement: function (imeStavke, imeKljuca) {
        return this.get(imeStavke)[imeKljuca];
    }, removeElement: function (imeStavke, imeKljuca) {
        var trenutno = this.get(imeStavke);
        delete trenutno[imeKljuca];
        this.set(imeStavke, trenutno);
    }
}