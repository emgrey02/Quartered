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
            {color: 'cyan'},
            {color: 'tomato'},
            {color: 'gold'},
            {color: 'aquamarine'},
            {color: 'plum'},
            {color: 'orange'},
            {color: 'green'}
          ]}
        />
        <ColorSelect
          settingsKey="colorTwo"
          colors={[
            {color: 'purple'},
            {color: 'tomato'},
            {color: 'gold'},
            {color: 'aquamarine'},
            {color: 'plum'},
            {color: 'orange'},
            {color: 'green'}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(settings);