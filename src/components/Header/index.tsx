import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  active?: string;
  menu?: Menu[];
}

interface Menu {
  title: string;
  url: string;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  active = '',
  menu = [
    { title: 'Listagem', url: '/' },
    { title: 'Nova Transação', url: '/create' },
    { title: 'Importar', url: '/import' },
  ],
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        {menu.map((menuItem) => (
          <Link
            key={menuItem.url}
            to={menuItem.url}
            className={menuItem.url === active ? 'active' : ''}
          >
            {menuItem.title}
          </Link>
        ))}
      </nav>
    </header>
  </Container>
);

export default Header;
