export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Catalogue']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Utilisateurs',
        to: '/users',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Produits',
        to: '/products',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Type de produit',
        to: '/type-product',
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },
    ]
  }
]