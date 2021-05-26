import React from 'react';
import './team.scss';
import { Card, Icon, Image } from 'semantic-ui-react';
import Christian from 'src/assets/img/ChristianPic.jpg';
import Laurent from 'src/assets/img/LaurentPic.jpg';
import Allan from 'src/assets/img/AllanPic.jpg';
import Lilian from 'src/assets/img/LilianPic.png';

const Team = () => (
  <div className="team">
    <h1 className="team__title">Qui Sommes-Nous ?</h1>
    <Card.Group centered>
      <Card>
        <img alt="christian" className="team__pic" src={Christian} />
        <Card.Content>
          <Card.Header>Christian</Card.Header>
          <Card.Meta>
            <div className="team__content__cards_role">Scrum Master</div>
            <div className="team__content__cards_role">Git Master Back</div>
          </Card.Meta>
          <Card.Description>
            {/* ADDITIONNAL TEXT AREA IF WE WANT */}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href="https://github.com/Christian-de-MERONA" target="_blank" rel="noreferrer">
            <Icon name="github" />
            GitHub
          </a>
        </Card.Content>
      </Card>
      <Card>
        <Image alt="allan" className="team__pic" src={Allan} wrapped ui={false} />
        <Card.Content>
          <Card.Header>Allan</Card.Header>
          <Card.Meta>
            <div className="team__content__cards_role">Lead Dev Back</div>
            <div className="team__content__cards_role">&zwnj;</div> {/* INVISIBLE DIV FOR ALL CARDS TO HAVE THE SAME HEIGHT */}
          </Card.Meta>
          <Card.Description>
            {/* ADDITIONNAL TEXT AREA IF WE WANT */}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href="https://github.com/AllanCitharel" target="_blank" rel="noreferrer">
            <Icon name="github" />
            GitHub
          </a>
        </Card.Content>
      </Card>
      <Card>
        <Image alt="laurent" className="team__pic" src={Laurent} wrapped ui={false} />
        <Card.Content>
          <Card.Header>Laurent</Card.Header>
          <Card.Meta>
            <div className="team__content__cards_role">Product Owner</div>
            <div className="team__content__cards_role">Lead Dev Front</div>
            <div className="team__content__cards_role">Référent UX</div>
          </Card.Meta>
          <Card.Description>
            {/* ADDITIONNAL TEXT AREA IF WE WANT */}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href="https://github.com/LDVerdier" target="_blank" rel="noreferrer">
            <Icon name="github" />
            GitHub
          </a>
        </Card.Content>
      </Card>
      <Card>
        <Image alt="lilian" className="team__pic" src={Lilian} wrapped ui={false} />
        <Card.Content>
          <Card.Header>Lilian</Card.Header>
          <Card.Meta>
            <div className="team__content__cards__role">Git Master Front</div>
            <div className="team__content__cards__role">Dev Front</div>
          </Card.Meta>
          <Card.Description>
            {/* ADDITIONNAL TEXT AREA IF WE WANT */}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href="https://github.com/Anderson1337" target="_blank" rel="noreferrer">
            <Icon name="github" />
            GitHub
          </a>
        </Card.Content>
      </Card>
    </Card.Group>
  </div>
);

export default Team;
