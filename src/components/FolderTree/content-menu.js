function isFolder(data) {
  return 'children' in data;
}

function showContentMenu($contextmenu, event) {
  var position = {
    left: event.clientX,
    top: event.clientY
  }
  $contextmenu.show(position)
}

function hideContentMenu($contextmenu) {
  $contextmenu.hide()
}

export {
  isFolder,
  showContentMenu,
  hideContentMenu
}
