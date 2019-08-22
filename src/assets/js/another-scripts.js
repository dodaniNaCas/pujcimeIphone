function toggleModal(id,ids) {
  $('#' + id).modal('toggle');
  if (ids) {
      var idsToRemove = new Array(ids);
      for (var item in idsToRemove["0"]) {
        document.getElementById(idsToRemove["0"][item]).value = null;
      }
  }
}
