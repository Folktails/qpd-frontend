import { Icon } from '~/images';
import { BaseSnackbar } from './base';
import { colors } from '~/style/common.stylex';

export const WarnSnackbar = ({ text }: { text: string }) => {
	return (
		<BaseSnackbar
			icon={<Icon.Warn size='14' color={colors.redSecondary} />}
			text={text}
		/>
	);
};
