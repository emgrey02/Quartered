function settings(props) {
  return (
    <Page>
      <Section title={<Text bold>Clock Settings</Text>}>
        <Toggle
          label={'Hide Battery Percentage'}
          settingsKey="hideBat"
        />
      </Section>
      <Section title={<Text bold>Gradient Colors</Text>}>
        <ColorSelect
          settingsKey="colorOne"
          colors={[
            {color: 'cadetblue'},
            {color: 'coral'},
            {color: 'darkred'},
            {color: 'darkslateblue'},
            {color: 'plum'},
            {color: 'gold'},
            {color: 'forestgreen'},
            {color: 'lavender'},
            {color: 'lightcyan'},
            {color: 'lightpink'},
            {color: 'lightseagreen'},
            {color: 'yellow'},
            {color: 'mediumaquamarine'},
            {color: 'orangered'},
            {color: 'rebeccapurple'},
            {color: 'saddlebrown'}
          ]}
        />
        <ColorSelect
          settingsKey="colorTwo"
          colors={[
            {color: 'cadetblue'},
            {color: 'coral'},
            {color: 'darkred'},
            {color: 'darkslateblue'},
            {color: 'plum'},
            {color: 'gold'},
            {color: 'forestgreen'},
            {color: 'lavender'},
            {color: 'lightcyan'},
            {color: 'lightpink'},
            {color: 'lightseagreen'},
            {color: 'yellow'},
            {color: 'mediumaquamarine'},
            {color: 'orangered'},
            {color: 'rebeccapurple'},
            {color: 'saddlebrown'}
          ]}
        />
      </Section>
      <Section title={<Text bold>Clock text color</Text>}>
        <ColorSelect
          settingsKey="textColor"
          colors={[
            {color: 'black'},
            {color: 'white'}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(settings);