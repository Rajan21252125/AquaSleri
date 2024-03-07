const DropdownMenu = () => {
  return (
    <div className="hidden group-hover:block absolute top-12 left-0 w-56 bg-black rounded-lg">
    <ul className="p-4 text-white text-lg space-y-4">
      <li>Water Purifiers</li>
      <li>Vacuum Cleaner</li>
      <li>Air Purifiers</li>
      <li>Water Solutions</li>
    </ul>
  </div>
  )
}

export default DropdownMenu
