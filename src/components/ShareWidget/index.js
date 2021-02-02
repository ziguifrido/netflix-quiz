import React from 'react'
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

import Widget from '../Widget'
import db from '../../../db.json'

const ShareWidget = () => {
  return (
    <Widget>
        <Widget.Header>
          <h1>Compartilhe com seus amigos</h1>
        </Widget.Header>
        <Widget.Content>
          <div style={{ textAlign: 'center' }}>
            <TelegramShareButton
              url="https://netflix-quiz.ziguifrido.vercel.app/"
              title="Teste os seus conhecimentos sobre a Netflix! "
            >
              <TelegramIcon size={50} borderRadius={db.theme.borderRadius}/>
            </TelegramShareButton>
            &nbsp;&nbsp;
            <WhatsappShareButton
              url="https://netflix-quiz.ziguifrido.vercel.app/"
              title="Teste os seus conhecimentos sobre a Netflix: "
            >
              <WhatsappIcon size={50} borderRadius={db.theme.borderRadius}/>
            </WhatsappShareButton>
            &nbsp;&nbsp;
            <TwitterShareButton
              url="https://netflix-quiz.ziguifrido.vercel.app/"
              title="Teste os seus conhecimentos sobre a Netflix: "
              via="MarcosOlivDev"
              hashtags={['AluraQuiz']}
            >
              <TwitterIcon size={50} borderRadius={db.theme.borderRadius}/>
            </TwitterShareButton>
            &nbsp;&nbsp;
            <FacebookShareButton
              url="https://netflix-quiz.ziguifrido.vercel.app/"
              quote="Teste os seus conhecimentos sobre a Netflix! "
            >
              <FacebookIcon size={50} borderRadius={db.theme.borderRadius}/>
            </FacebookShareButton>
          </div>
        </Widget.Content>
      </Widget>
  )
}

export default ShareWidget
