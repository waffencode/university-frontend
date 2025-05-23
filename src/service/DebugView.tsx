import React from "react";

const DebugView: React.FC<{ data: any }> = (data: any) => {
	return (
		<pre
			style={{
				whiteSpace: "pre-wrap",
				wordWrap: "break-word",
				background: "white",
				padding: "1rem",
				borderRadius: "4px",
				marginTop: "1rem",
			}}
		>
			{JSON.stringify(data, null, 2)}
		</pre>
	);
};

export default DebugView;
