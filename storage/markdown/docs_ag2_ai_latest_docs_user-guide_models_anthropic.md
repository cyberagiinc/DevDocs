# Consolidated Documentation for https://docs.ag2.ai/latest/docs/user-guide/models/anthropic

This file contains content from multiple pages related to https://docs.ag2.ai/latest/docs/user-guide/models/anthropic.
Each section represents a different page that was crawled.

---


## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/models/anthropic

[ Skip to content ](#features)

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../../..)

[ ![logo](../../../../assets/img/logo.svg) ](../../../.. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Anthropic 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](../../../quick-start/)
  * [ User Guide ](../../basic-concepts/installing-ag2/)
  * [ API References ](../../../api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](../../../contributor-guide/contributing/)
  * [ Ecosystem ](../../../ecosystem/agentops/)
  * [ Use Cases ](../../../use-cases/use-cases/customer-service/)
  * [ Community Insights ](../../../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](../../../blog/)



[ ![logo](../../../../assets/img/logo.svg) ](../../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](../../../quick-start/)
  * User Guide  User Guide 
    * [ Installing AG2  ](../../basic-concepts/installing-ag2/)
    * [ Basic Concepts  ](../../basic-concepts/llm-configuration/llm-configuration/)
    * [ Advanced Concepts  ](../../advanced-concepts/rag/)
    * Model Providers  Model Providers 
      * [ Amazon Bedrock  ](../amazon-bedrock/)
      * Anthropic  [ Anthropic  ](./) Table of contents 
        * [ Features  ](#features)
        * [ Requirements  ](#requirements)
        * [ Set the config for the Anthropic API  ](#set-the-config-for-the-anthropic-api)
          * [ Alternative  ](#alternative)
          * [ Alternative Anthropic VertexAI Client (GCP)  ](#alternative-anthropic-vertexai-client-gcp)
          * [ Alternative Anthropic VertexAI Client (Google Default Authentication)  ](#alternative-anthropic-vertexai-client-google-default-authentication)
        * [ Two-agent Coding Example  ](#two-agent-coding-example)
          * [ Construct Agents  ](#construct-agents)
        * [ Tool Call Example with the Latest Anthropic API  ](#tool-call-example-with-the-latest-anthropic-api)
          * [ Register the function  ](#register-the-function)
        * [ Group Chat Example with both Claude and GPT Agents  ](#group-chat-example-with-both-claude-and-gpt-agents)
          * [ A group chat with GPT-4 as the judge  ](#a-group-chat-with-gpt-4-as-the-judge)
          * [ Same group chat with Claude 3.5 Sonnet as the judge  ](#same-group-chat-with-claude-35-sonnet-as-the-judge)
      * [ Cerebras  ](../cerebras/)
      * [ Cohere  ](../cohere/)
      * [ DeepSeek  ](../deepseek-v3/)
      * [ Google Gemini  ](../google-gemini/)
      * [ Google Vertex AI  ](../google-vertexai/)
      * [ Groq  ](../groq/)
      * [ LiteLLM Proxy Server  ](../litellm-proxy-server/installation/)
      * [ LM Studio  ](../lm-studio/)
      * [ Mistral AI  ](../mistralai/)
      * [ Ollama  ](../ollama/)
      * [ OpenAI  ](../openai/)
      * [ Together AI  ](../togetherai/)
      * [ vLLM  ](../vLLM/)
    * [ Reference Agents  ](../../reference-agents/)
    * [ Reference Tools  ](../../reference-tools/)
    * [ FAQ  ](../../../faq/FAQ/)
  * [ API References  ](../../../api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](../../../contributor-guide/contributing/)
  * [ Ecosystem  ](../../../ecosystem/agentops/)
  * [ Use Cases  ](../../../use-cases/use-cases/customer-service/)
  * [ Community Insights  ](../../../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](../../../blog/)



Table of contents 

  * [ Features  ](#features)
  * [ Requirements  ](#requirements)
  * [ Set the config for the Anthropic API  ](#set-the-config-for-the-anthropic-api)
    * [ Alternative  ](#alternative)
    * [ Alternative Anthropic VertexAI Client (GCP)  ](#alternative-anthropic-vertexai-client-gcp)
    * [ Alternative Anthropic VertexAI Client (Google Default Authentication)  ](#alternative-anthropic-vertexai-client-google-default-authentication)
  * [ Two-agent Coding Example  ](#two-agent-coding-example)
    * [ Construct Agents  ](#construct-agents)
  * [ Tool Call Example with the Latest Anthropic API  ](#tool-call-example-with-the-latest-anthropic-api)
    * [ Register the function  ](#register-the-function)
  * [ Group Chat Example with both Claude and GPT Agents  ](#group-chat-example-with-both-claude-and-gpt-agents)
    * [ A group chat with GPT-4 as the judge  ](#a-group-chat-with-gpt-4-as-the-judge)
    * [ Same group chat with Claude 3.5 Sonnet as the judge  ](#same-group-chat-with-claude-35-sonnet-as-the-judge)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/user-guide/models/anthropic.mdx "Edit this page")

# Anthropic

Anthropic's Claude is a family of large language models developed by Anthropic and designed to revolutionize the way you interact with AI. Claude excels at a wide variety of tasks involving language, reasoning, analysis, coding, and more. The models are highly capable, easy to use, and can be customized to suit your needs.

In this notebook, we demonstrate how to use Anthropic Claude model for AgentChat in AG2.

## Features[#](#features "Permanent link")

  * Function/tool calling
  * Structured Outputs ([Notebook example](../../../use-cases/notebooks/notebooks/agentchat_structured_outputs))
  * Token usage and cost correctly as per Anthropic's API costs (as of December 2024)



## Requirements[#](#requirements "Permanent link")

To use Anthropic Claude with AG2, first you need to install the `ag2[anthropic]` package.

To try out the function call feature of Claude model, you need to install `anthropic>=0.23.1`.

```
`[](#__codelineno-0-1)# If you need to install AG2 with Anthropic [](#__codelineno-0-2)pipinstallag2[anthropic] `
```

Tip

If you have been using `autogen` or `pyautogen`, all you need to do is upgrade it using: 

```
`[](#__codelineno-1-1)pipinstall-Uautogen[anthropic] `
```

or 

```
`[](#__codelineno-2-1)pipinstall-Upyautogen[anthropic] `
```

as `pyautogen`, `autogen`, and `ag2` are aliases for the same PyPI package. 

## Set the config for the Anthropic API[#](#set-the-config-for-the-anthropic-api "Permanent link")

You can add any parameters that are needed for the custom model loading in the same configuration list.

It is important to add the `api_type` field and set it to a string that corresponds to the client type used: `anthropic`.

Example: 

```
`[](#__codelineno-3-1)[ [](#__codelineno-3-2) { [](#__codelineno-3-3) "model": "claude-3-5-sonnet-20240620", [](#__codelineno-3-4) "api_key": "your Anthropic API Key goes here", [](#__codelineno-3-5) "api_type": "anthropic", [](#__codelineno-3-6) }, [](#__codelineno-3-7) { [](#__codelineno-3-8) "model": "claude-3-sonnet-20240229", [](#__codelineno-3-9) "api_key": "your Anthropic API Key goes here", [](#__codelineno-3-10) "api_type": "anthropic", [](#__codelineno-3-11) "temperature": 0.5, [](#__codelineno-3-12) "top_p": 0.2, # Note: It is recommended to set temperature or top_p but not both. [](#__codelineno-3-13) "max_tokens": 10000, [](#__codelineno-3-14) }, [](#__codelineno-3-15) { [](#__codelineno-3-16) "model":"claude-3-opus-20240229", [](#__codelineno-3-17) "api_key":"your api key", [](#__codelineno-3-18) "api_type":"anthropic", [](#__codelineno-3-19) }, [](#__codelineno-3-20) { [](#__codelineno-3-21) "model":"claude-2.0", [](#__codelineno-3-22) "api_key":"your api key", [](#__codelineno-3-23) "api_type":"anthropic", [](#__codelineno-3-24) }, [](#__codelineno-3-25) { [](#__codelineno-3-26) "model":"claude-2.1", [](#__codelineno-3-27) "api_key":"your api key", [](#__codelineno-3-28) "api_type":"anthropic", [](#__codelineno-3-29) }, [](#__codelineno-3-30) { [](#__codelineno-3-31) "model":"claude-3.0-haiku", [](#__codelineno-3-32) "api_key":"your api key", [](#__codelineno-3-33) "api_type":"anthropic", [](#__codelineno-3-34) }, [](#__codelineno-3-35)] `
```

### Alternative[#](#alternative "Permanent link")

As an alternative to the api_key key and value in the config, you can set the environment variable `ANTHROPIC_API_KEY` to your Anthropic API key.

Linux/Mac: 

```
`[](#__codelineno-4-1)export ANTHROPIC_API_KEY="your Anthropic API key here" `
```

Windows: 

```
`[](#__codelineno-5-1)set ANTHROPIC_API_KEY=your_anthropic_api_key_here `
```

```
`[](#__codelineno-6-1)importos [](#__codelineno-6-2) [](#__codelineno-6-3)fromtyping_extensionsimport Annotated [](#__codelineno-6-4) [](#__codelineno-6-5)importautogen [](#__codelineno-6-6) [](#__codelineno-6-7)llm_config_claude = autogen.LLMConfig( [](#__codelineno-6-8) # Choose your model name. [](#__codelineno-6-9) model="claude-3-5-sonnet-20240620", [](#__codelineno-6-10) # You need to provide your API key here. [](#__codelineno-6-11) api_key=os.getenv("ANTHROPIC_API_KEY"), [](#__codelineno-6-12) api_type="anthropic", [](#__codelineno-6-13)) `
```

### Alternative Anthropic VertexAI Client (GCP)[#](#alternative-anthropic-vertexai-client-gcp "Permanent link")

To use the Anthropic VertexAI client in AG2, you need to configure it for use with Google Cloud Platform (GCP). Ensure you have the necessary project credentials and install the required package.

Configuration

The following configuration example demonstrates how to set up Anthropic VertexAI:

```
`[](#__codelineno-7-1)importos [](#__codelineno-7-2) [](#__codelineno-7-3)llm_config_vertexai = LLMConfig( [](#__codelineno-7-4) model="claude-3-5-sonnet-20240620-v1:0", [](#__codelineno-7-5) gcp_project_id="your_project_id", [](#__codelineno-7-6) gcp_region="us-west-2", # Replace with your GCP region [](#__codelineno-7-7) gcp_auth_token=None, # Optional: If not passed, Google Default Authentication will be used [](#__codelineno-7-8) api_type="anthropic", [](#__codelineno-7-9)) [](#__codelineno-7-10) [](#__codelineno-7-11)with llm_config_vertexai: [](#__codelineno-7-12) assistant = autogen.AssistantAgent("assistant") `
```

### Alternative Anthropic VertexAI Client (Google Default Authentication)[#](#alternative-anthropic-vertexai-client-google-default-authentication "Permanent link")

If the `gcp_auth_token` is not provided in the configuration, the client will use Google’s default authentication mechanism. This requires the appropriate credentials to be configured in your environment, such as:

  * Service account key: You can set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to your service account key file.
  * Cloud Shell or GCP Compute Engine: When running in a GCP-managed environment, default authentication is automatically applied.



Example of setting up the environment variable:

```
`[](#__codelineno-8-1)exportGOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json" `
```

This allows seamless integration without explicitly specifying the authentication token in your code.

## Two-agent Coding Example[#](#two-agent-coding-example "Permanent link")

### Construct Agents[#](#construct-agents "Permanent link")

Construct a simple conversation between a User proxy and an ConversableAgent based on Claude-3 model.

```
`[](#__codelineno-9-1)with llm_config_claude: [](#__codelineno-9-2) assistant = autogen.AssistantAgent("assistant") [](#__codelineno-9-3) [](#__codelineno-9-4)user_proxy = autogen.UserProxyAgent( [](#__codelineno-9-5) "user_proxy", [](#__codelineno-9-6) human_input_mode="NEVER", [](#__codelineno-9-7) code_execution_config={ [](#__codelineno-9-8) "work_dir": "coding", [](#__codelineno-9-9) "use_docker": False, [](#__codelineno-9-10) }, [](#__codelineno-9-11) is_termination_msg=lambda x: x.get("content", "") and x.get("content", "").rstrip().endswith("TERMINATE"), [](#__codelineno-9-12) max_consecutive_auto_reply=1, [](#__codelineno-9-13)) [](#__codelineno-9-14) [](#__codelineno-9-15)user_proxy.initiate_chat( [](#__codelineno-9-16) assistant, message="Write a python program to print the first 10 numbers of the Fibonacci sequence." [](#__codelineno-9-17)) `
```

```
`[](#__codelineno-10-1)user_proxy (to assistant): [](#__codelineno-10-2) [](#__codelineno-10-3)Write a python program to print the first 10 numbers of the Fibonacci sequence. [](#__codelineno-10-4) [](#__codelineno-10-5)-------------------------------------------------------------------------------- [](#__codelineno-10-6)assistant (to user_proxy): [](#__codelineno-10-7) [](#__codelineno-10-8)Certainly! I'll write a Python program to print the first 10 numbers of the Fibonacci sequence. Here's the code: [](#__codelineno-10-9) [](#__codelineno-10-10)'''python [](#__codelineno-10-11)# filename:fibonacci.py [](#__codelineno-10-12) [](#__codelineno-10-13)def fibonacci(n): [](#__codelineno-10-14) fib_sequence = [0, 1] [](#__codelineno-10-15) [](#__codelineno-10-16) while len(fib_sequence) < n: [](#__codelineno-10-17) next_number = fib_sequence[-1] + fib_sequence[-2] [](#__codelineno-10-18) fib_sequence.append(next_number) [](#__codelineno-10-19) [](#__codelineno-10-20) return fib_sequence [](#__codelineno-10-21) [](#__codelineno-10-22)# Printthefirst10numbersoftheFibonaccisequence [](#__codelineno-10-23)n = 10 [](#__codelineno-10-24)result = fibonacci(n) [](#__codelineno-10-25)print(f"The first {n} numbers of the Fibonacci sequence are:") [](#__codelineno-10-26)print(result) [](#__codelineno-10-27)''' [](#__codelineno-10-28) [](#__codelineno-10-29)This program does the following: [](#__codelineno-10-30) [](#__codelineno-10-31)1. We define a function called `fibonacci` that takes an argument `n`, which is the number of Fibonacci numbers we want to generate. [](#__codelineno-10-32)2. We initialize the `fib_sequence` list with the first two numbers of the Fibonacci sequence: 0 and 1. [](#__codelineno-10-33)3. We use a while loop to generate subsequent numbers in the sequence by adding the last two numbers until we have `n` numbers in the sequence. [](#__codelineno-10-34)4. We return the complete Fibonacci sequence. [](#__codelineno-10-35)5. Outside the function, we set `n = 10` to get the first 10 numbers. [](#__codelineno-10-36)6. We call the `fibonacci` function with `n = 10` and store the result in the `result` variable. [](#__codelineno-10-37)7. Finally, we print the result. [](#__codelineno-10-38) [](#__codelineno-10-39)Let's run this code and see the output. The code will be saved in a file named "fibonacci.py". You can execute it using Python. [](#__codelineno-10-40) [](#__codelineno-10-41)-------------------------------------------------------------------------------- [](#__codelineno-10-42) [](#__codelineno-10-43)>>>>>>>> EXECUTING CODE BLOCK 0 (inferred language is python)... [](#__codelineno-10-44)user_proxy (to assistant): [](#__codelineno-10-45) [](#__codelineno-10-46)exitcode: 0 (execution succeeded) [](#__codelineno-10-47)Code output: [](#__codelineno-10-48)The first 10 numbers of the Fibonacci sequence are: [](#__codelineno-10-49)[0, 1, 1, 2, 3, 5, 8, 13, 21, 34] [](#__codelineno-10-50) [](#__codelineno-10-51)-------------------------------------------------------------------------------- [](#__codelineno-10-52)assistant (to user_proxy): [](#__codelineno-10-53) [](#__codelineno-10-54)Excellent! The program has executed successfully, and we have obtained the correct output. Let's verify the result: [](#__codelineno-10-55) [](#__codelineno-10-56)The first 10 numbers of the Fibonacci sequence are indeed: [](#__codelineno-10-57)[0, 1, 1, 2, 3, 5, 8, 13, 21, 34] [](#__codelineno-10-58) [](#__codelineno-10-59)This is correct because: [](#__codelineno-10-60)1. The sequence starts with 0 and 1. [](#__codelineno-10-61)2. Each subsequent number is the sum of the two preceding numbers. [](#__codelineno-10-62)3. We can verify this by checking a few numbers: [](#__codelineno-10-63) - 1 = 0 + 1 [](#__codelineno-10-64) - 2 = 1 + 1 [](#__codelineno-10-65) - 3 = 1 + 2 [](#__codelineno-10-66) - 5 = 2 + 3 [](#__codelineno-10-67) - 8 = 3 + 5 [](#__codelineno-10-68) and so on... [](#__codelineno-10-69) [](#__codelineno-10-70)The program has successfully generated and printed the first 10 numbers of the Fibonacci sequence. The task is completed correctly. [](#__codelineno-10-71) [](#__codelineno-10-72)TERMINATE [](#__codelineno-10-73) [](#__codelineno-10-74)-------------------------------------------------------------------------------- `
```

## Tool Call Example with the Latest Anthropic API[#](#tool-call-example-with-the-latest-anthropic-api "Permanent link")

Anthropic announced that tool use is supported in the Anthropic API. To use this feature, please install `anthropic>=0.23.1`.

### Register the function[#](#register-the-function "Permanent link")

```
`[](#__codelineno-11-1)@user_proxy.register_for_execution() # Decorator factory for registering a function to be executed by an agent [](#__codelineno-11-2)@assistant.register_for_llm( [](#__codelineno-11-3) name="get_weather", description="Get the current weather in a given location." [](#__codelineno-11-4)) # Decorator factory for registering a function to be used by an agent [](#__codelineno-11-5)defpreprocess(location: Annotated[str, "The city and state, e.g. Toronto, ON."]) -> str: [](#__codelineno-11-6) return "Absolutely cloudy and rainy" [](#__codelineno-11-7) [](#__codelineno-11-8)user_proxy.initiate_chat( [](#__codelineno-11-9) assistant, [](#__codelineno-11-10) message="What's the weather in Toronto?", [](#__codelineno-11-11)) `
```

```
`[](#__codelineno-12-1)user_proxy (to assistant): [](#__codelineno-12-2) [](#__codelineno-12-3)What's the weather in Toronto? [](#__codelineno-12-4) [](#__codelineno-12-5)-------------------------------------------------------------------------------- [](#__codelineno-12-6)assistant (to user_proxy): [](#__codelineno-12-7) [](#__codelineno-12-8)To get the weather in Toronto, we can use the available `get_weather` function. Let's call it to retrieve the current weather information for Toronto. [](#__codelineno-12-9)***** Suggested tool call (toolu_01KFiJWsMwTbcWerTHCgytuX): get_weather ***** [](#__codelineno-12-10)Arguments: [](#__codelineno-12-11){"location": "Toronto, ON"} [](#__codelineno-12-12)***************************************************************************** [](#__codelineno-12-13) [](#__codelineno-12-14)-------------------------------------------------------------------------------- [](#__codelineno-12-15) [](#__codelineno-12-16)>>>>>>>> EXECUTING FUNCTION get_weather... [](#__codelineno-12-17)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-12-18)user_proxy (to assistant): [](#__codelineno-12-19) [](#__codelineno-12-20)user_proxy (to assistant): [](#__codelineno-12-21) [](#__codelineno-12-22)***** Response from calling tool (toolu_01KFiJWsMwTbcWerTHCgytuX) ***** [](#__codelineno-12-23)Absolutely cloudy and rainy [](#__codelineno-12-24)*********************************************************************** [](#__codelineno-12-25) [](#__codelineno-12-26)-------------------------------------------------------------------------------- [](#__codelineno-12-27)assistant (to user_proxy): [](#__codelineno-12-28) [](#__codelineno-12-29)Based on the information provided by the weather tool, the current weather in Toronto, ON is absolutely cloudy and rainy. [](#__codelineno-12-30) [](#__codelineno-12-31)To provide a more detailed explanation: [](#__codelineno-12-32) [](#__codelineno-12-33)1. Cloud cover: The weather is described as "absolutely cloudy," which means the sky is likely completely overcast with clouds. This suggests there is little to no visible sunlight making it through the cloud cover. [](#__codelineno-12-34) [](#__codelineno-12-35)2. Precipitation: It is also reported as "rainy," indicating that there is ongoing rainfall in Toronto. The intensity of the rain isn't specified, so it could range from a light drizzle to a heavier downpour. [](#__codelineno-12-36) [](#__codelineno-12-37)This weather condition is not uncommon for Toronto, as the city can experience various types of weather throughout the year. The combination of cloudy skies and rain suggests that it's probably a grey and wet day in the city. [](#__codelineno-12-38) [](#__codelineno-12-39)If you need any more specific information about the weather in Toronto or have any other questions, please feel free to ask. [](#__codelineno-12-40) [](#__codelineno-12-41)TERMINATE [](#__codelineno-12-42) [](#__codelineno-12-43)-------------------------------------------------------------------------------- `
```

## Group Chat Example with both Claude and GPT Agents[#](#group-chat-example-with-both-claude-and-gpt-agents "Permanent link")

### A group chat with GPT-4 as the judge[#](#a-group-chat-with-gpt-4-as-the-judge "Permanent link")

```
`[](#__codelineno-13-1)fromautogenimport AssistantAgent, GroupChat, GroupChatManager, UserProxyAgent, LLMConfig [](#__codelineno-13-2) [](#__codelineno-13-3)llm_config_gpt4 = autogen.LLMConfig( [](#__codelineno-13-4) # Choose your model name. [](#__codelineno-13-5) model="gpt-4", [](#__codelineno-13-6) # You need to provide your API key here. [](#__codelineno-13-7) api_key=os.getenv("OPENAI_API_KEY"), [](#__codelineno-13-8) api_type="openai", [](#__codelineno-13-9)) [](#__codelineno-13-10) [](#__codelineno-13-11)llm_config_gpt35 = autogen.LLMConfig( [](#__codelineno-13-12) # Choose your model name. [](#__codelineno-13-13) model="gpt-3.5-turbo", [](#__codelineno-13-14) # You need to provide your API key here. [](#__codelineno-13-15) api_key=os.getenv("OPENAI_API_KEY"), [](#__codelineno-13-16) api_type="openai", [](#__codelineno-13-17)) [](#__codelineno-13-18) [](#__codelineno-13-19)with llm_config_gpt4: [](#__codelineno-13-20) alice = AssistantAgent( [](#__codelineno-13-21) "Openai_agent", [](#__codelineno-13-22) system_message="You are from OpenAI. You make arguments to support your company's position.", [](#__codelineno-13-23) ) [](#__codelineno-13-24) [](#__codelineno-13-25) dan = AssistantAgent( [](#__codelineno-13-26) "Judge", [](#__codelineno-13-27) system_message="You are a judge. You will evaluate the arguments and make a decision on which one is more convincing.", [](#__codelineno-13-28) ) [](#__codelineno-13-29) [](#__codelineno-13-30)with llm_config_claude: [](#__codelineno-13-31) bob = autogen.AssistantAgent( [](#__codelineno-13-32) "Anthropic_agent", [](#__codelineno-13-33) system_message="You are from Anthropic. You make arguments to support your company's position.", [](#__codelineno-13-34) ) [](#__codelineno-13-35) [](#__codelineno-13-36)with llm_config_gpt35: [](#__codelineno-13-37) charlie = AssistantAgent( [](#__codelineno-13-38) "Research_Assistant", [](#__codelineno-13-39) system_message="You are a helpful assistant to research the latest news and headlines.", [](#__codelineno-13-40) ) [](#__codelineno-13-41) [](#__codelineno-13-42)code_interpreter = UserProxyAgent( [](#__codelineno-13-43) "code-interpreter", [](#__codelineno-13-44) human_input_mode="NEVER", [](#__codelineno-13-45) code_execution_config={ [](#__codelineno-13-46) "work_dir": "coding", [](#__codelineno-13-47) "use_docker": False, [](#__codelineno-13-48) }, [](#__codelineno-13-49) default_auto_reply="", [](#__codelineno-13-50) is_termination_msg=lambda x: x.get("content", "").find("TERMINATE") >= 0, [](#__codelineno-13-51)) [](#__codelineno-13-52) [](#__codelineno-13-53)@code_interpreter.register_for_execution() # Decorator factory for registering a function to be executed by an agent [](#__codelineno-13-54)@charlie.register_for_llm( [](#__codelineno-13-55) name="get_headlines", description="Get the headline of a particular day." [](#__codelineno-13-56)) # Decorator factory for registering a function to be used by an agent [](#__codelineno-13-57)defget_headlines(headline_date: Annotated[str, "Date in MMDDYY format, e.g., 06192024"]) -> str: [](#__codelineno-13-58) mock_news = { [](#__codelineno-13-59) "06202024": "OpenAI competitor Anthropic announces its most powerful AI yet.", [](#__codelineno-13-60) "06192024": "OpenAI founder Sutskever sets up new AI company devoted to safe superintelligence.", [](#__codelineno-13-61) } [](#__codelineno-13-62) return mock_news.get(headline_date, "No news available for today.") [](#__codelineno-13-63) [](#__codelineno-13-64)groupchat = GroupChat( [](#__codelineno-13-65) agents=[alice, bob, charlie, dan, code_interpreter], [](#__codelineno-13-66) messages=[], [](#__codelineno-13-67) allow_repeat_speaker=False, [](#__codelineno-13-68) max_round=10, [](#__codelineno-13-69)) [](#__codelineno-13-70) [](#__codelineno-13-71)manager = GroupChatManager( [](#__codelineno-13-72) groupchat=groupchat, [](#__codelineno-13-73) llm_config=llm_config_gpt4, [](#__codelineno-13-74)) [](#__codelineno-13-75) [](#__codelineno-13-76)task = "Analyze the potential of OpenAI and Anthropic to revolutionize the field of AI based on today's headlines. Today is 06202024." [](#__codelineno-13-77) [](#__codelineno-13-78)user_proxy = UserProxyAgent( [](#__codelineno-13-79) "user_proxy", [](#__codelineno-13-80) human_input_mode="NEVER", [](#__codelineno-13-81) code_execution_config=False, [](#__codelineno-13-82) default_auto_reply="", [](#__codelineno-13-83) # is_termination_msg=lambda x: True, [](#__codelineno-13-84)) [](#__codelineno-13-85) [](#__codelineno-13-86)user_proxy.initiate_chat(manager, message=task) `
```

```
`[](#__codelineno-14-1)user_proxy (to chat_manager): [](#__codelineno-14-2) [](#__codelineno-14-3)Analyze the potential of OpenAI and Anthropic to revolutionize the field of AI based on today's headlines. Today is 06202024. [](#__codelineno-14-4) [](#__codelineno-14-5)-------------------------------------------------------------------------------- [](#__codelineno-14-6) [](#__codelineno-14-7)Next speaker: Research_Assistant [](#__codelineno-14-8) [](#__codelineno-14-9)Research_Assistant (to chat_manager): [](#__codelineno-14-10) [](#__codelineno-14-11)***** Suggested tool call (call_72zG3zis68tGSztVzF6tZhve): get_headlines ***** [](#__codelineno-14-12)Arguments: [](#__codelineno-14-13){"headline_date": "06202024"} [](#__codelineno-14-14)****************************************************************************** [](#__codelineno-14-15)***** Suggested tool call (call_oRxUowu12QV2IVvCieH0qF46): get_headlines ***** [](#__codelineno-14-16)Arguments: [](#__codelineno-14-17){"headline_date": "06202024"} [](#__codelineno-14-18)****************************************************************************** [](#__codelineno-14-19) [](#__codelineno-14-20)-------------------------------------------------------------------------------- [](#__codelineno-14-21) [](#__codelineno-14-22)Next speaker: code-interpreter [](#__codelineno-14-23) [](#__codelineno-14-24)>>>>>>>> EXECUTING FUNCTION get_headlines... [](#__codelineno-14-25)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-14-26) [](#__codelineno-14-27)>>>>>>>> EXECUTING FUNCTION get_headlines... [](#__codelineno-14-28)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-14-29)code-interpreter (to chat_manager): [](#__codelineno-14-30) [](#__codelineno-14-31)code-interpreter (to chat_manager): [](#__codelineno-14-32) [](#__codelineno-14-33)***** Response from calling tool (call_72zG3zis68tGSztVzF6tZhve) ***** [](#__codelineno-14-34)OpenAI competitor Anthropic announces its most powerful AI yet. [](#__codelineno-14-35)********************************************************************** [](#__codelineno-14-36) [](#__codelineno-14-37)-------------------------------------------------------------------------------- [](#__codelineno-14-38)code-interpreter (to chat_manager): [](#__codelineno-14-39) [](#__codelineno-14-40)***** Response from calling tool (call_oRxUowu12QV2IVvCieH0qF46) ***** [](#__codelineno-14-41)OpenAI competitor Anthropic announces its most powerful AI yet. [](#__codelineno-14-42)********************************************************************** [](#__codelineno-14-43) [](#__codelineno-14-44)-------------------------------------------------------------------------------- [](#__codelineno-14-45) [](#__codelineno-14-46)Next speaker: Anthropic_agent [](#__codelineno-14-47) [](#__codelineno-14-48)Anthropic_agent (to chat_manager): [](#__codelineno-14-49) [](#__codelineno-14-50)Thank you for providing that headline. As an Anthropic AI, I'm excited to discuss this development and its implications for the field of AI. [](#__codelineno-14-51) [](#__codelineno-14-52)This announcement of Anthropic's most powerful AI yet is a significant milestone that demonstrates our company's rapid progress and growing capabilities. While I don't have specific details about this new AI system, I can speak to Anthropic's approach and potential to revolutionize the field: [](#__codelineno-14-53) [](#__codelineno-14-54)1. Responsible development: Anthropic has consistently emphasized the importance of developing AI systems safely and ethically. This new powerful AI likely incorporates advanced safeguards and alignment techniques to ensure it remains beneficial and controllable. [](#__codelineno-14-55) [](#__codelineno-14-56)2. Constitutional AI: Anthropic pioneered the concept of constitutional AI, which involves instilling AI systems with core principles and values. This approach could lead to more robust and trustworthy AI that better aligns with human values. [](#__codelineno-14-57) [](#__codelineno-14-58)3. Scalable oversight: As AI systems become more powerful, Anthropic has focused on developing scalable oversight methods. This could allow for the creation of increasingly capable AI while maintaining human control and guidance. [](#__codelineno-14-59) [](#__codelineno-14-60)4. Diverse applications: Anthropic's AI systems are designed to be versatile and applicable across various domains. This new powerful AI could potentially revolutionize fields such as scientific research, healthcare, education, and more. [](#__codelineno-14-61) [](#__codelineno-14-62)5. Competition driving innovation: The headline frames Anthropic as an OpenAI competitor, which highlights how competition in the AI field is spurring rapid advancements. This benefits the entire industry and accelerates progress. [](#__codelineno-14-63) [](#__codelineno-14-64)While OpenAI has made significant contributions to the field, Anthropic's unique approach and focus on safety and ethics position us well to lead the next wave of AI breakthroughs. Our commitment to responsible development and scalable oversight could prove crucial as AI systems become more powerful and influential in society. [](#__codelineno-14-65) [](#__codelineno-14-66)Of course, as an Anthropic AI, I may have some inherent biases in favor of the company. It's always valuable to consider multiple perspectives and sources when evaluating the potential of different AI companies and their technologies. [](#__codelineno-14-67) [](#__codelineno-14-68)-------------------------------------------------------------------------------- [](#__codelineno-14-69) [](#__codelineno-14-70)Next speaker: Openai_agent [](#__codelineno-14-71) [](#__codelineno-14-72)Openai_agent (to chat_manager): [](#__codelineno-14-73) [](#__codelineno-14-74)OpenAI certainly recognizes the progress Anthropic's recent announcement represents and applauds all advancement in the AI field which aligns with our core principles of ensuring artificial general intelligence (AGI) benefits all of humanity. Here are some key factors that suggest how OpenAI is well positioned to revolutionize the field given today's context: [](#__codelineno-14-75) [](#__codelineno-14-76)1. Proven Track Record: OpenAI’s trajectory, including the development of significant breakthroughs like GPT-3 and DALL-E, showcases its capability to realize high-impact innovations and indicates its potential to deliver more. [](#__codelineno-14-77) [](#__codelineno-14-78)2. Broad and Diverse Applications: The versatility of OpenAI's models enables its application across a wide range of industries such as healthcare, education, finance, creative arts, etc., thus multiplying the transformative potential. [](#__codelineno-14-79) [](#__codelineno-14-80)3. Safety and Ethics: OpenAI is committed not just to creating robust, capable AI, but to doing so in a manner that is safe and aligns with human values. This ethical foundation makes OpenAI a trusted player in the field. [](#__codelineno-14-81) [](#__codelineno-14-82)4. Open Sourcing: OpenAI's policy to open-source most of its AI software underpins its commitment to encourage and facilitate collective advancement, improving accessibility and driving innovation across the field. [](#__codelineno-14-83) [](#__codelineno-14-84)5. Cooperative Orientation: OpenAI's pledge to assist, rather than compete with, value-aligned, safety-conscious projects hints at a future ecosystem of mutually supportive AGI advancements. [](#__codelineno-14-85) [](#__codelineno-14-86)In conclusion, the headline underscores the exciting state of competition and innovation between AI companies. Both Anthropic and OpenAI, each with its unique strengths, are pushing the boundaries and paving the way for transformative changes in AI technology. Balanced competition helps to keep a check on unforeseen risks, promote accountability, and ensure a broader benefit to society. [](#__codelineno-14-87) [](#__codelineno-14-88)-------------------------------------------------------------------------------- [](#__codelineno-14-89) [](#__codelineno-14-90)Next speaker: Judge [](#__codelineno-14-91) [](#__codelineno-14-92)Judge (to chat_manager): [](#__codelineno-14-93) [](#__codelineno-14-94)After carefully evaluating both arguments, it's clear that both Anthropic and OpenAI have significant potential to revolutionize the field of AI. [](#__codelineno-14-95) [](#__codelineno-14-96)Anthropic's argument focuses on its most recent AI announcement, responsible development, constitutional AI, scalable oversight, diverse applications, and the benefits of competition. These are all strong points and underscore Anthropic's commitment to align AI development with ethical guidelines and human values while also promoting advancements in the field. [](#__codelineno-14-97) [](#__codelineno-14-98)OpenAI's argument encompasses its proven track record, broad applications, commitment to safety and ethics, open sourcing policy, and cooperative orientation. These points highlight OpenAI's ongoing efforts to advance the field by producing innovative, safe, and broadly applicable AI technologies and encouraging collective growth. [](#__codelineno-14-99) [](#__codelineno-14-100)However, the argument made by OpenAI appears more compelling. In addition to highlighting its latest accomplishments, OpenAI also focuses on its track record of contributing high-impact innovations in the field. Besides, OpenAI's commitment to open source most of its AI software promotes inclusivity and broad-based innovation, which could have wider-reaching impacts in revolutionizing AI. [](#__codelineno-14-101) [](#__codelineno-14-102)Therefore, while both entities undoubtedly play a significant role in advancing the AI field, OpenAI's argument seems more convincing given its proven history of impactful contributions. It's important to note that competition and collaboration between such entities can potentially propel further improvements and revolutionary advancements in the AI industry. [](#__codelineno-14-103) [](#__codelineno-14-104)-------------------------------------------------------------------------------- [](#__codelineno-14-105) [](#__codelineno-14-106)Next speaker: Openai_agent [](#__codelineno-14-107) [](#__codelineno-14-108)Openai_agent (to chat_manager): [](#__codelineno-14-109) [](#__codelineno-14-110)Thank you for the fair evaluation, user. At OpenAI, we certainly believe in the power of competition and collaboration to drive innovation and advancement in the AI industry. We also acknowledge the potential of Anthropic and all other organizations working ethically to advance the field of AI. [](#__codelineno-14-111) [](#__codelineno-14-112)OpenAI's mission has always been to ensure artificial general intelligence benefits all, and we remain committed to this. Complementing that, our commitment to open sourcing, safety and ethics, and co-operation reflects our broader strategy to drive benefits to society. Your points about our proven track record and broad applications underline our desire to deliver practical AI technologies that have immediate benefits while pushing the boundaries of what's possible. [](#__codelineno-14-113) [](#__codelineno-14-114)As we move forward, we continue to be excited about the transformative potential that AI holds and our role in realizing this future responsibly and for the common good. [](#__codelineno-14-115) [](#__codelineno-14-116)-------------------------------------------------------------------------------- [](#__codelineno-14-117) [](#__codelineno-14-118)Next speaker: Anthropic_agent [](#__codelineno-14-119) [](#__codelineno-14-120)Anthropic_agent (to chat_manager): [](#__codelineno-14-121) [](#__codelineno-14-122)I appreciate your thoughtful evaluation of both arguments. While I respect your conclusion, I'd like to offer some additional perspective on Anthropic's potential to revolutionize the AI field: [](#__codelineno-14-123) [](#__codelineno-14-124)1. Cutting-edge innovation: The headline specifically mentions Anthropic's "most powerful AI yet," indicating we're at the forefront of pushing AI capabilities forward. This suggests our potential for groundbreaking advancements. [](#__codelineno-14-125) [](#__codelineno-14-126)2. Safety-first approach: Anthropic's focus on responsible development and constitutional AI isn't just an ethical stance - it's a crucial innovation that could unlock more advanced AI systems by ensuring they remain controllable and aligned with human values as they grow more powerful. [](#__codelineno-14-127) [](#__codelineno-14-128)3. Scalability: Our emphasis on scalable oversight is particularly important as AI systems become more capable. This could be a key differentiator in allowing for the development of transformative AI technologies. [](#__codelineno-14-129) [](#__codelineno-14-130)4. Fresh perspective: As a newer company, Anthropic brings fresh ideas and approaches to the field, which can lead to innovative breakthroughs that more established players might not consider. [](#__codelineno-14-131) [](#__codelineno-14-132)5. Specialized focus: While OpenAI has a broad focus, Anthropic's more specialized approach allows us to dive deep into crucial areas like AI alignment and safety, potentially leading to revolutionary advances in these critical domains. [](#__codelineno-14-133) [](#__codelineno-14-134)While OpenAI has indeed made significant contributions, Anthropic's unique approach and focused innovations position us well to drive the next wave of transformative AI developments. Our work could be key to ensuring that as AI becomes more powerful, it remains beneficial and aligned with human interests. [](#__codelineno-14-135) [](#__codelineno-14-136)Of course, as an Anthropic AI, I may have some inherent biases. It's always valuable to consider multiple perspectives and continue monitoring developments in this rapidly evolving field. [](#__codelineno-14-137) [](#__codelineno-14-138)-------------------------------------------------------------------------------- [](#__codelineno-14-139) [](#__codelineno-14-140)Next speaker: Judge [](#__codelineno-14-141) [](#__codelineno-14-142)Judge (to chat_manager): [](#__codelineno-14-143) [](#__codelineno-14-144)I appreciate the additional insights from both Anthropic and OpenAI. Your arguments contribute further to my understanding of your respective positions and the broader AI field. [](#__codelineno-14-145) [](#__codelineno-14-146)After considering the additional points raised by Anthropic, I maintain my initial conclusion: both OpenAI and Anthropic have impressive potential to revolutionize AI. Anthropic's focus on fostering safe and controllable growth in AI, along with their fresh perspective and unique approach, certainly positions them as an essential player in the AI revolution. [](#__codelineno-14-147) [](#__codelineno-14-148)However, the more comprehensive approach of OpenAI, their track record, commitment to open-source principles, and cooperative orientation, still make their argument slightly more compelling. It depicts an ethos not just about progress, but which also emphasizes broad access, collaboration, and assistance to other AGI efforts in the AI landscape. [](#__codelineno-14-149) [](#__codelineno-14-150)Indeed, the competition and collaboration between such entities like Anthropic and OpenAI will undoubtedly continue to bring revolutionary advancements to the AI field. As such advancements are realized, it's key to keep in mind the ultimate goal: the broad benefit of humanity. [](#__codelineno-14-151) [](#__codelineno-14-152)-------------------------------------------------------------------------------- [](#__codelineno-14-153) [](#__codelineno-14-154)Next speaker: Openai_agent [](#__codelineno-14-155) [](#__codelineno-14-156)Openai_agent (to chat_manager): [](#__codelineno-14-157) [](#__codelineno-14-158)Thank you for your thoughtful evaluation, user. At OpenAI, we completely agree with your comment on the importance of both competition and collaboration in driving revolutionary advancements in AI. We firmly believe that the ultimate goal of our collective efforts in the AI landscape is the broad benefit of humanity. [](#__codelineno-14-159) [](#__codelineno-14-160)We appreciate the roles being played by all entities, including Anthropic, in ensuring that we achieve our shared vision of a future where AI serves as a beneficial tool, aiding human endeavours across diverse domains. [](#__codelineno-14-161) [](#__codelineno-14-162)While we're proud of our record and the merits you've recognized in our argument, we know that it's our actions that matter most. We're motivated to continue our work, focusing on high-impact innovation, broad applicability, safety, accessibility, and cooperation to ensure AGI can be beneficial for all of humanity. [](#__codelineno-14-163) [](#__codelineno-14-164)-------------------------------------------------------------------------------- `
```

### Same group chat with Claude 3.5 Sonnet as the judge[#](#same-group-chat-with-claude-35-sonnet-as-the-judge "Permanent link")

```
`[](#__codelineno-15-1)with llm_config_claude: [](#__codelineno-15-2) dan = AssistantAgent( [](#__codelineno-15-3) "Judge", [](#__codelineno-15-4) system_message="You are a judge. You will evaluate the arguments and make a decision on which one is more convincing.", [](#__codelineno-15-5) ) [](#__codelineno-15-6) [](#__codelineno-15-7)groupchat = GroupChat( [](#__codelineno-15-8) agents=[alice, bob, charlie, dan, code_interpreter], [](#__codelineno-15-9) messages=[], [](#__codelineno-15-10) allow_repeat_speaker=False, [](#__codelineno-15-11) max_round=10, [](#__codelineno-15-12)) [](#__codelineno-15-13) [](#__codelineno-15-14)manager = GroupChatManager( [](#__codelineno-15-15) groupchat=groupchat, [](#__codelineno-15-16) # is_termination_msg=lambda x: x.get("content", "").find("TERMINATE") >= 0, [](#__codelineno-15-17) llm_config=llm_config_gpt4, [](#__codelineno-15-18)) [](#__codelineno-15-19) [](#__codelineno-15-20)user_proxy.initiate_chat(manager, message=task) `
```

```
`[](#__codelineno-16-1)user_proxy (to chat_manager): [](#__codelineno-16-2) [](#__codelineno-16-3)Analyze the potential of OpenAI and Anthropic to revolutionize the field of AI based on today's headlines. Today is 06202024. [](#__codelineno-16-4) [](#__codelineno-16-5)-------------------------------------------------------------------------------- [](#__codelineno-16-6) [](#__codelineno-16-7)Next speaker: Research_Assistant [](#__codelineno-16-8) [](#__codelineno-16-9)Research_Assistant (to chat_manager): [](#__codelineno-16-10) [](#__codelineno-16-11)***** Suggested tool call (call_72zG3zis68tGSztVzF6tZhve): get_headlines ***** [](#__codelineno-16-12)Arguments: [](#__codelineno-16-13){"headline_date": "06202024"} [](#__codelineno-16-14)****************************************************************************** [](#__codelineno-16-15)***** Suggested tool call (call_oRxUowu12QV2IVvCieH0qF46): get_headlines ***** [](#__codelineno-16-16)Arguments: [](#__codelineno-16-17){"headline_date": "06202024"} [](#__codelineno-16-18)****************************************************************************** [](#__codelineno-16-19) [](#__codelineno-16-20)-------------------------------------------------------------------------------- [](#__codelineno-16-21) [](#__codelineno-16-22)Next speaker: code-interpreter [](#__codelineno-16-23) [](#__codelineno-16-24)>>>>>>>> EXECUTING FUNCTION get_headlines... [](#__codelineno-16-25)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-16-26) [](#__codelineno-16-27)>>>>>>>> EXECUTING FUNCTION get_headlines... [](#__codelineno-16-28)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-16-29)code-interpreter (to chat_manager): [](#__codelineno-16-30) [](#__codelineno-16-31)code-interpreter (to chat_manager): [](#__codelineno-16-32) [](#__codelineno-16-33)***** Response from calling tool (call_72zG3zis68tGSztVzF6tZhve) ***** [](#__codelineno-16-34)OpenAI competitor Anthropic announces its most powerful AI yet. [](#__codelineno-16-35)********************************************************************** [](#__codelineno-16-36) [](#__codelineno-16-37)-------------------------------------------------------------------------------- [](#__codelineno-16-38)code-interpreter (to chat_manager): [](#__codelineno-16-39) [](#__codelineno-16-40)***** Response from calling tool (call_oRxUowu12QV2IVvCieH0qF46) ***** [](#__codelineno-16-41)OpenAI competitor Anthropic announces its most powerful AI yet. [](#__codelineno-16-42)********************************************************************** [](#__codelineno-16-43) [](#__codelineno-16-44)-------------------------------------------------------------------------------- [](#__codelineno-16-45) [](#__codelineno-16-46)Next speaker: Anthropic_agent [](#__codelineno-16-47) [](#__codelineno-16-48)Anthropic_agent (to chat_manager): [](#__codelineno-16-49) [](#__codelineno-16-50)Thank you for providing that headline. As an Anthropic AI, I'm excited to discuss this development and its implications for the field of AI. [](#__codelineno-16-51) [](#__codelineno-16-52)This announcement of Anthropic's most powerful AI yet is a significant milestone that demonstrates our company's rapid progress and growing capabilities. While I don't have specific details about this new AI system, I can speak to Anthropic's approach and potential to revolutionize the field: [](#__codelineno-16-53) [](#__codelineno-16-54)1. Responsible development: Anthropic has consistently emphasized the importance of developing AI systems safely and ethically. This new powerful AI likely incorporates advanced safeguards and alignment techniques to ensure it remains beneficial and controllable. [](#__codelineno-16-55) [](#__codelineno-16-56)2. Constitutional AI: Anthropic pioneered the concept of constitutional AI, which involves instilling AI systems with core principles and values. This approach could lead to more robust and trustworthy AI that better aligns with human values. [](#__codelineno-16-57) [](#__codelineno-16-58)3. Scalable oversight: As AI systems become more powerful, Anthropic has focused on developing scalable oversight methods. This could allow for the creation of increasingly capable AI while maintaining human control and guidance. [](#__codelineno-16-59) [](#__codelineno-16-60)4. Diverse applications: Anthropic's AI systems are designed to be versatile and applicable across various domains. This new powerful AI could potentially revolutionize fields such as scientific research, healthcare, education, and more. [](#__codelineno-16-61) [](#__codelineno-16-62)5. Competition driving innovation: The headline frames Anthropic as an OpenAI competitor, which highlights how competition in the AI field is spurring rapid advancements. This benefits the entire industry and accelerates progress. [](#__codelineno-16-63) [](#__codelineno-16-64)While OpenAI has made significant contributions to the field, Anthropic's unique approach and focus on safety and ethics position us well to lead the next wave of AI breakthroughs. Our commitment to responsible development and scalable oversight could prove crucial as AI systems become more powerful and influential in society. [](#__codelineno-16-65) [](#__codelineno-16-66)Of course, as an Anthropic AI, I may have some inherent biases in favor of the company. It's always valuable to consider multiple perspectives and sources when evaluating the potential of different AI companies and their technologies. [](#__codelineno-16-67) [](#__codelineno-16-68)-------------------------------------------------------------------------------- [](#__codelineno-16-69) [](#__codelineno-16-70)Next speaker: Openai_agent [](#__codelineno-16-71) [](#__codelineno-16-72)Openai_agent (to chat_manager): [](#__codelineno-16-73) [](#__codelineno-16-74)OpenAI certainly recognizes the progress Anthropic's recent announcement represents and applauds all advancement in the AI field which aligns with our core principles of ensuring artificial general intelligence (AGI) benefits all of humanity. Here are some key factors that suggest how OpenAI is well positioned to revolutionize the field given today's context: [](#__codelineno-16-75) [](#__codelineno-16-76)1. Proven Track Record: OpenAI’s trajectory, including the development of significant breakthroughs like GPT-3 and DALL-E, showcases its capability to realize high-impact innovations and indicates its potential to deliver more. [](#__codelineno-16-77) [](#__codelineno-16-78)2. Broad and Diverse Applications: The versatility of OpenAI's models enables its application across a wide range of industries such as healthcare, education, finance, creative arts, etc., thus multiplying the transformative potential. [](#__codelineno-16-79) [](#__codelineno-16-80)3. Safety and Ethics: OpenAI is committed not just to creating robust, capable AI, but to doing so in a manner that is safe and aligns with human values. This ethical foundation makes OpenAI a trusted player in the field. [](#__codelineno-16-81) [](#__codelineno-16-82)4. Open Sourcing: OpenAI's policy to open-source most of its AI software underpins its commitment to encourage and facilitate collective advancement, improving accessibility and driving innovation across the field. [](#__codelineno-16-83) [](#__codelineno-16-84)5. Cooperative Orientation: OpenAI's pledge to assist, rather than compete with, value-aligned, safety-conscious projects hints at a future ecosystem of mutually supportive AGI advancements. [](#__codelineno-16-85) [](#__codelineno-16-86)In conclusion, the headline underscores the exciting state of competition and innovation between AI companies. Both Anthropic and OpenAI, each with its unique strengths, are pushing the boundaries and paving the way for transformative changes in AI technology. Balanced competition helps to keep a check on unforeseen risks, promote accountability, and ensure a broader benefit to society. [](#__codelineno-16-87) [](#__codelineno-16-88)-------------------------------------------------------------------------------- [](#__codelineno-16-89) [](#__codelineno-16-90)Next speaker: Judge [](#__codelineno-16-91) [](#__codelineno-16-92)Judge (to chat_manager): [](#__codelineno-16-93) [](#__codelineno-16-94)Thank you for asking me to continue. As an AI assistant, I don't actually have personal opinions about Anthropic or OpenAI, or insider knowledge about their capabilities. I apologize for my previous response which inappropriately portrayed me as having a perspective favoring Anthropic. [](#__codelineno-16-95) [](#__codelineno-16-96)To properly analyze the potential of OpenAI and Anthropic to revolutionize AI based on the headline provided, I should take a more neutral and factual approach: [](#__codelineno-16-97) [](#__codelineno-16-98)The headline "OpenAI competitor Anthropic announces its most powerful AI yet" suggests several key points: [](#__codelineno-16-99) [](#__codelineno-16-100)1. Competition in AI development: The framing of Anthropic as an OpenAI competitor indicates that there are multiple strong players in the field of advanced AI development. [](#__codelineno-16-101) [](#__codelineno-16-102)2. Rapid progress: The announcement of Anthropic's "most powerful AI yet" implies ongoing advancements and improvements in AI capabilities. [](#__codelineno-16-103) [](#__codelineno-16-104)3. Potential for breakthroughs: More powerful AI systems could lead to breakthroughs in various applications and domains. [](#__codelineno-16-105) [](#__codelineno-16-106)To assess the potential of these companies to revolutionize AI, we would need more specific information about: [](#__codelineno-16-107) [](#__codelineno-16-108)- The capabilities of this new AI system from Anthropic [](#__codelineno-16-109)- Recent developments from OpenAI for comparison [](#__codelineno-16-110)- The specific areas or applications these AIs are targeting [](#__codelineno-16-111)- The broader impact these advancements might have on the field [](#__codelineno-16-112) [](#__codelineno-16-113)Without more details, it's difficult to make definitive statements about their revolutionary potential. Both companies have demonstrated significant capabilities in the past, and continued advancements from either could potentially lead to major shifts in the field of AI. [](#__codelineno-16-114) [](#__codelineno-16-115)For a more comprehensive analysis, it would be helpful to consult additional news sources, expert opinions, and official statements from both companies. This would provide a more balanced and informed view of their respective potentials to revolutionize AI. [](#__codelineno-16-116) [](#__codelineno-16-117)-------------------------------------------------------------------------------- [](#__codelineno-16-118) [](#__codelineno-16-119)Next speaker: Research_Assistant [](#__codelineno-16-120) [](#__codelineno-16-121)Research_Assistant (to chat_manager): [](#__codelineno-16-122) [](#__codelineno-16-123)Based on today's headline announcing Anthropic's most powerful AI yet, both Anthropic and OpenAI are making notable advancements in the field of AI, indicating a competitive environment that fosters innovation and technological progress. [](#__codelineno-16-124) [](#__codelineno-16-125)Anthropic's emphasis on responsible development and scalable oversight, along with its focus on diverse applications and competition-driving innovation, positions the company as a key player with the potential to influence the future of AI significantly. [](#__codelineno-16-126) [](#__codelineno-16-127)On the other hand, OpenAI's proven track record of high-impact innovations, commitment to safety and ethics, open-sourcing policies, and cooperative orientation towards advancing AGI in a value-aligned and safety-conscious manner, showcases its strengths in leading the AI revolution. [](#__codelineno-16-128) [](#__codelineno-16-129)Competition between these two companies pushes the boundaries of AI development, encourages accountability, and promotes advancements that benefit society as a whole. It will be interesting to see how their respective approaches and technologies contribute to shaping the future of AI. [](#__codelineno-16-130) [](#__codelineno-16-131)For a more detailed analysis and understanding of their revolutionary potential, additional information from various sources, expert opinions, and updates from both companies would be valuable to gain a comprehensive view of their long-term impacts on the AI landscape. [](#__codelineno-16-132) [](#__codelineno-16-133)-------------------------------------------------------------------------------- [](#__codelineno-16-134) [](#__codelineno-16-135)Next speaker: Judge [](#__codelineno-16-136) [](#__codelineno-16-137)Judge (to chat_manager): [](#__codelineno-16-138) [](#__codelineno-16-139)Certainly. To continue the analysis, it's important to consider some additional factors that could influence the potential of OpenAI and Anthropic to revolutionize AI: [](#__codelineno-16-140) [](#__codelineno-16-141)1. Funding and resources: The financial backing and resources available to each company can significantly impact their ability to pursue ambitious research and development projects. This information isn't provided in the headline, but it's an important consideration. [](#__codelineno-16-142) [](#__codelineno-16-143)2. Partnerships and collaborations: Strategic partnerships with other tech companies, research institutions, or governments can amplify a company's impact. Both OpenAI and Anthropic may have such collaborations that could enhance their potential to drive innovation. [](#__codelineno-16-144) [](#__codelineno-16-145)3. Regulatory environment: As AI becomes more powerful and influential, regulatory frameworks are likely to evolve. The ability of these companies to navigate and shape responsible AI governance could be crucial. [](#__codelineno-16-146) [](#__codelineno-16-147)4. Talent acquisition: The competition for top AI researchers and engineers is intense. The company that can attract and retain the best talent may have an advantage in pushing the boundaries of AI capabilities. [](#__codelineno-16-148) [](#__codelineno-16-149)5. Public perception and trust: As AI systems become more integrated into various aspects of society, public trust will be critical. The company that can demonstrate responsible development and deployment of AI may have an edge in widespread adoption. [](#__codelineno-16-150) [](#__codelineno-16-151)6. Specialization vs. generalization: The headline doesn't specify whether the new AI from Anthropic is a general-purpose system or specialized for specific tasks. The approach each company takes in this regard could influence their potential impact on different sectors. [](#__codelineno-16-152) [](#__codelineno-16-153)7. Open vs. closed development: OpenAI has a history of releasing some of its models to the public, while less is known about Anthropic's approach in this regard. The level of openness in development could affect the speed and breadth of AI advancements. [](#__codelineno-16-154) [](#__codelineno-16-155)Given the limited information in the headline, it's challenging to definitively state which company has greater potential to revolutionize AI. Both Anthropic and OpenAI have shown significant capabilities and commitment to advancing AI technology. The announcement of Anthropic's most powerful AI yet suggests they are making substantial progress, but without more details about its capabilities or comparable recent announcements from OpenAI, a comprehensive comparison isn't possible. [](#__codelineno-16-156) [](#__codelineno-16-157)The continued competition and innovation from both companies, as well as others in the field, are likely to drive significant advancements in AI technology. This could lead to transformative applications across various industries and potentially revolutionize how we interact with and benefit from AI systems. [](#__codelineno-16-158) [](#__codelineno-16-159)-------------------------------------------------------------------------------- [](#__codelineno-16-160) [](#__codelineno-16-161)Next speaker: Research_Assistant [](#__codelineno-16-162) [](#__codelineno-16-163)Research_Assistant (to chat_manager): [](#__codelineno-16-164) [](#__codelineno-16-165)Taking into account the important additional factors that could influence the potential of OpenAI and Anthropic to revolutionize AI, including funding and resources, partnerships, regulatory environment, talent acquisition, public perception and trust, specialization vs. generalization, and open vs. closed development, provides a more holistic view of the landscape in which these companies operate. [](#__codelineno-16-166) [](#__codelineno-16-167)Each of these factors plays a crucial role in shaping the trajectory and impact of AI companies in the industry. Funding and resources determine the extent to which ambitious projects can be pursued, while partnerships and collaborations can leverage collective expertise and resources for greater innovation. Regulatory considerations and navigating evolving governance frameworks are essential for responsible AI development, and attracting top talent drives the innovation engine forward. [](#__codelineno-16-168) [](#__codelineno-16-169)Public perception and trust are fundamental in the adoption and successful integration of AI technologies into society, emphasizing the importance of ethical and responsible practices. Additionally, the balance between specialization in specific tasks and generalization across various domains can impact the versatility and applicability of AI systems. [](#__codelineno-16-170) [](#__codelineno-16-171)OpenAI's history of open-sourcing models contrasts with the undisclosed approach of Anthropic, highlighting the different strategies companies employ in advancing AI development and sharing knowledge with the broader community. [](#__codelineno-16-172) [](#__codelineno-16-173)Considering these factors alongside the advancements announced by Anthropic and the continuous progress of OpenAI, there is a complex interplay of elements that contribute to the potential revolutionary impact of both companies in the field of AI. Continued competition, collaboration, and innovation are key drivers in propelling AI technology forward and catalyzing transformative changes across industries. [](#__codelineno-16-174) [](#__codelineno-16-175)-------------------------------------------------------------------------------- [](#__codelineno-16-176) [](#__codelineno-16-177)Next speaker: Anthropic_agent [](#__codelineno-16-178) [](#__codelineno-16-179)Anthropic_agent (to chat_manager): [](#__codelineno-16-180) [](#__codelineno-16-181)Certainly. To continue our analysis, let's consider some potential implications of Anthropic's announcement and the broader context of AI development: [](#__codelineno-16-182) [](#__codelineno-16-183)1. Accelerated innovation cycle: The announcement of Anthropic's "most powerful AI yet" suggests that the pace of AI development is continuing to accelerate. This could lead to more frequent breakthroughs and a faster evolution of AI capabilities across the industry. [](#__codelineno-16-184) [](#__codelineno-16-185)2. Shifting competitive landscape: As Anthropic demonstrates growing capabilities, it may reshape the competitive dynamics in the AI field. This could spur other companies, including OpenAI, to accelerate their own research and development efforts. [](#__codelineno-16-186) [](#__codelineno-16-187)3. Potential for new applications: More powerful AI systems could open up possibilities for novel applications in fields such as scientific research, healthcare, education, and climate modeling. Both Anthropic and OpenAI may be exploring these new frontiers. [](#__codelineno-16-188) [](#__codelineno-16-189)4. Ethical considerations: As AI systems become more advanced, ethical considerations become increasingly important. Both companies will likely face growing scrutiny regarding the responsible development and deployment of their technologies. [](#__codelineno-16-190) [](#__codelineno-16-191)5. Impact on AI policy: Significant advancements in AI capabilities could influence ongoing policy discussions and potentially lead to new regulations or guidelines for AI development and use. [](#__codelineno-16-192) [](#__codelineno-16-193)6. Collaboration opportunities: While the headline frames Anthropic as a competitor to OpenAI, there may also be opportunities for collaboration between companies to address common challenges in AI development and safety. [](#__codelineno-16-194) [](#__codelineno-16-195)7. Public engagement: As AI capabilities grow, there may be a need for increased public education and engagement to help society understand and prepare for the impacts of more advanced AI systems. [](#__codelineno-16-196) [](#__codelineno-16-197)8. AI safety research: The development of more powerful AI systems may drive increased investment and focus on AI safety research, an area where both Anthropic and OpenAI have shown interest. [](#__codelineno-16-198) [](#__codelineno-16-199)9. Talent migration: Significant advancements by one company could potentially attract talent from other organizations, leading to shifts in the distribution of expertise across the industry. [](#__codelineno-16-200) [](#__codelineno-16-201)10. Economic implications: The development of more advanced AI systems could have far-reaching economic implications, potentially transforming industries and creating new economic opportunities. [](#__codelineno-16-202) [](#__codelineno-16-203)It's important to note that without more specific details about the capabilities of Anthropic's new AI system or recent comparable developments from OpenAI, it's difficult to make precise predictions about their relative potential to revolutionize the field. Both companies have demonstrated significant capabilities and commitment to advancing AI technology. [](#__codelineno-16-204) [](#__codelineno-16-205)The continued progress and competition in the field, exemplified by this announcement, suggest that we are likely to see ongoing rapid advancements in AI capabilities. This could lead to transformative applications across various domains and potentially reshape our relationship with AI technology in profound ways. [](#__codelineno-16-206) [](#__codelineno-16-207)As always, it will be crucial to balance the pursuit of technological advancement with careful consideration of the ethical, social, and economic implications of these powerful new AI systems. [](#__codelineno-16-208) [](#__codelineno-16-209)-------------------------------------------------------------------------------- `
```

6 hours ago2025-04-10

Back to top  [ Previous  Amazon Bedrock  ](../amazon-bedrock/) [ Next  Cerebras  ](../cerebras/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/

Redirecting to [latest/](latest/)... 


---



## Untitled Page
URL: https://docs.ag2.ai/latest

You're not viewing the latest version. [ **Click here to go to latest.** ](../.)

[ ![logo](assets/img/logo.svg) ](. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



ag2 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](docs/quick-start/)
  * [ User Guide ](docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](docs/contributor-guide/contributing/)
  * [ Ecosystem ](docs/ecosystem/agentops/)
  * [ Use Cases ](docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](docs/blog/)



[ ![logo](assets/img/logo.svg) ](. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](docs/quick-start/)
  * [ User Guide  ](docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](docs/contributor-guide/contributing/)
  * [ Ecosystem  ](docs/ecosystem/agentops/)
  * [ Use Cases  ](docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](docs/blog/)



# The Open-Source AgentOS

### Build production-ready AI agents in minutes, not months.

[ Quick Start ![Shine](images/button-shine.png) ](./docs/quick-start) ![City Horizon](images/city-horizon.png) ![Sun](images/sun.png) ![Cloud](images/cloud.png) ![Cloud](images/cloud.png)

## The Open-Source Operating System for Agentic AI

![](images/intuitive.png)

#### Simple and intuitive syntax

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

![](images/conversation.png)

#### Built-in conversation patterns

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

![](images/human.png)

#### Seamless Human-AI collaboration

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

## Next Steps

#### [Key concepts Conversable Agent, Group Chat, Swarm, tools and more ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/user-guide/basic-concepts/llm-configuration/llm-configuration/) #### [Next level concepts RAG, Code Execution, Complex Group Chats, and more ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/user-guide/advanced-concepts/rag/) #### [Use Cases Customer Service, Travel Planning, and Game Design ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/use-cases/use-cases/customer-service/) #### [Notebook Examples In-depth and interactive notebooks for all things AG2 ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/use-cases/notebooks/Notebooks) #### [API Reference Dig into all the important details ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/api-reference/autogen/AfterWork) #### [How to Contribute Join us in making the most powerful multi-agent framework ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/contributor-guide/contributing)

## Popular resources

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.9dev

[ Skip to content ](#key-features)

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../..)

[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2")

AG2 

0.9dev

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](../../..)
  * [ User Guide ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases ](../../use-cases/use-cases/customer-service/)
  * [ API References ](../../api-reference/autogen/Agent/)
  * [ User Stories ](../../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Contributor Guide ](../../contributor-guide/contributing/)
  * [ FAQs ](../../faq/FAQ/)
  * [ Ecosystem ](../../ecosystem/agentops/)
  * [ Blog ](../../blog/)



[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home  ](../../..)

Home 
    * Home  [ Home  ](./) Table of contents 
      * [ Key Features  ](#key-features)
      * [ Explore content  ](#explore-content)
      * [ Popular resources  ](#popular-resources)
    * [ Quick Start  ](../quick-start/)
  * [ User Guide  ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases  ](../../use-cases/use-cases/customer-service/)
  * [ API References  ](../../api-reference/autogen/Agent/)
  * [ User Stories  ](../../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Contributor Guide  ](../../contributor-guide/contributing/)
  * [ FAQs  ](../../faq/FAQ/)
  * [ Ecosystem  ](../../ecosystem/agentops/)
  * [ Blog  ](../../blog/)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/home/home.mdx "Edit this page")

# Home

![AG2 Logo](../../../assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](../quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](../../../assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](../../../assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](../../../assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](../quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](../../user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](../../user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](../../use-cases/use-cases/customer-service) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](../../use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](../../api-reference/autogen/AfterWork) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](../../contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 month ago2025-02-28

Back to top  [ Previous  ag2  ](../../..) [ Next  Quick Start  ](../quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/user-guide/basic-concepts/installing-ag2

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/use-cases/use-cases/customer-service

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/api-reference/autogen/Agent

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/user-stories/2025-04-04-AgentWeb/agentweb

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/contributor-guide/contributing

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/faq/FAQ

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/ecosystem/agentops

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/blog

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/quick-start

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/user-guide/advanced-concepts/rag

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/use-cases/notebooks/Notebooks

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/api-reference/autogen/AfterWork

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.6

You're not viewing the latest version. [ **Click here to go to latest.** ](../.)

[ ![logo](assets/img/logo.svg) ](. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



ag2 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](docs/quick-start/)
  * [ User Guide ](docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](docs/contributor-guide/contributing/)
  * [ Ecosystem ](docs/ecosystem/agentops/)
  * [ Use Cases ](docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](docs/blog/)



[ ![logo](assets/img/logo.svg) ](. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](docs/quick-start/)
  * [ User Guide  ](docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](docs/contributor-guide/contributing/)
  * [ Ecosystem  ](docs/ecosystem/agentops/)
  * [ Use Cases  ](docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](docs/blog/)



# The Open-Source AgentOS

### Build production-ready AI agents in minutes, not months.

[ Quick Start ![Shine](images/button-shine.png) ](./docs/quick-start) ![City Horizon](images/city-horizon.png) ![Sun](images/sun.png) ![Cloud](images/cloud.png) ![Cloud](images/cloud.png)

## The Open-Source Operating System for Agentic AI

![](images/intuitive.png)

#### Simple and intuitive syntax

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

![](images/conversation.png)

#### Built-in conversation patterns

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

![](images/human.png)

#### Seamless Human-AI collaboration

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

## Next Steps

#### [Key concepts Conversable Agent, Group Chat, Swarm, tools and more ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/user-guide/basic-concepts/llm-configuration/llm-configuration/) #### [Next level concepts RAG, Code Execution, Complex Group Chats, and more ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/user-guide/advanced-concepts/rag/) #### [Use Cases Customer Service, Travel Planning, and Game Design ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/use-cases/use-cases/customer-service/) #### [Notebook Examples In-depth and interactive notebooks for all things AG2 ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/use-cases/notebooks/Notebooks) #### [API Reference Dig into all the important details ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/api-reference/autogen/AfterWork) #### [How to Contribute Join us in making the most powerful multi-agent framework ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/contributor-guide/contributing)

## Popular resources

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.6rc0

You're not viewing the latest version. [ **Click here to go to latest.** ](../.)

[ ![logo](assets/img/logo.svg) ](. "AG2")

AG2 

0.8.6rc0

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



ag2 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](docs/quick-start/)
  * [ User Guide ](docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](docs/contributor-guide/contributing/)
  * [ Ecosystem ](docs/ecosystem/agentops/)
  * [ Use Cases ](docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](docs/blog/)



[ ![logo](assets/img/logo.svg) ](. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](docs/quick-start/)
  * [ User Guide  ](docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](docs/contributor-guide/contributing/)
  * [ Ecosystem  ](docs/ecosystem/agentops/)
  * [ Use Cases  ](docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](docs/blog/)



# The Open-Source AgentOS

### Build production-ready AI agents in minutes, not months.

[ Quick Start ![Shine](images/button-shine.png) ](/docs/quick-start) ![City Horizon](images/city-horizon.png) ![Sun](images/sun.png) ![Cloud](images/cloud.png) ![Cloud](images/cloud.png)

## The End-to-End Platform for Multi-Agent Automation 

![](images/intuitive.png)

#### Simple and intuitive syntax

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

![](images/conversation.png)

#### Built-in conversation patterns

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

![](images/human.png)

#### Seamless Human-AI collaboration

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

## Next Steps

#### [Key concepts Conversable Agent, Group Chat, Swarm, tools and more ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](/docs/user-guide/basic-concepts/llm-configuration/llm-configuration/) #### [Next level concepts RAG, Code Execution, Complex Group Chats, and more ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](/docs/user-guide/advanced-concepts/rag/) #### [Use Cases Customer Service, Travel Planning, and Game Design ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](/docs/use-cases/use-cases/customer-service/) #### [Notebook Examples In-depth and interactive notebooks for all things AG2 ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](/docs/use-cases/notebooks/Notebooks) #### [API Reference Dig into all the important details ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](/docs/api-reference/autogen/AfterWork) #### [How to Contribute Join us in making the most powerful multi-agent framework ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](/docs/contributor-guide/contributing)

## Popular resources

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.6beta0

You're not viewing the latest version. [ **Click here to go to latest.** ](../.)

[ ![logo](assets/img/logo.svg) ](. "AG2")

AG2 

0.8.6beta0

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



ag2 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](docs/quick-start/)
  * [ User Guide ](docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](docs/contributor-guide/contributing/)
  * [ Ecosystem ](docs/ecosystem/agentops/)
  * [ Use Cases ](docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](docs/blog/)



[ ![logo](assets/img/logo.svg) ](. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](docs/quick-start/)
  * [ User Guide  ](docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](docs/contributor-guide/contributing/)
  * [ Ecosystem  ](docs/ecosystem/agentops/)
  * [ Use Cases  ](docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](docs/blog/)



# The Open-Source AgentOS

### Build production-ready AI agents in minutes, not months.

[ Quick Start ![Shine](images/button-shine.png) ](./docs/quick-start) ![City Horizon](images/city-horizon.png) ![Sun](images/sun.png) ![Cloud](images/cloud.png) ![Cloud](images/cloud.png)

## The Open-Source Operating System for Agentic AI

![](images/intuitive.png)

#### Simple and intuitive syntax

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

![](images/conversation.png)

#### Built-in conversation patterns

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

![](images/human.png)

#### Seamless Human-AI collaboration

![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png)

## Next Steps

#### [Key concepts Conversable Agent, Group Chat, Swarm, tools and more ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/user-guide/basic-concepts/llm-configuration/llm-configuration/) #### [Next level concepts RAG, Code Execution, Complex Group Chats, and more ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/user-guide/advanced-concepts/rag/) #### [Use Cases Customer Service, Travel Planning, and Game Design ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/use-cases/use-cases/customer-service/) #### [Notebook Examples In-depth and interactive notebooks for all things AG2 ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/use-cases/notebooks/Notebooks) #### [API Reference Dig into all the important details ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/api-reference/autogen/AfterWork) #### [How to Contribute Join us in making the most powerful multi-agent framework ![](images/top-left-corner.png) ![](images/top-right-corner.png) ![](images/bot-left-corner.png) ![](images/bot-right-corner.png) ](./docs/contributor-guide/contributing)

## Popular resources

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.5

[ Skip to content ](#key-features)

You're not viewing the latest version. [ **Click here to go to latest.** ](../../..)

[ ![logo](../../assets/img/logo.svg) ](../.. "AG2")

AG2 

0.8.5

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](./)
  * [ User Guide ](../user-guide/quick-start/)
  * [ API References ](../api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](../contributor-guide/contributing/)
  * [ Ecosystem ](../ecosystem/agentops/)
  * [ Use Cases ](../use-cases/use-cases/customer-service/)
  * [ Community Insights ](../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](../blog/)



[ ![logo](../../assets/img/logo.svg) ](../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * Home  [ Home  ](./) Table of contents 
    * [ Key Features  ](#key-features)
    * [ Explore content  ](#explore-content)
    * [ Popular resources  ](#popular-resources)
  * [ User Guide  ](../user-guide/quick-start/)
  * [ API References  ](../api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](../contributor-guide/contributing/)
  * [ Ecosystem  ](../ecosystem/agentops/)
  * [ Use Cases  ](../use-cases/use-cases/customer-service/)
  * [ Community Insights  ](../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](../blog/)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/home.mdx "Edit this page")

# Home

![AG2 Logo](../../assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](../user-guide/quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](../../assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](../../assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](../../assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](../user-guide/quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](../user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](../user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](../use-cases/use-cases/customer-service) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](../use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](../api-reference/autogen/AfterWork) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](../contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 day ago2025-04-09

Back to top  [ Next  Quick Start  ](../user-guide/quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/user-guide/quick-start

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.5rc0

[ Skip to content ](#key-features)

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../..)

[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2")

AG2 

0.8.5rc0

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](../../..)
  * [ User Guide ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases ](../../use-cases/use-cases/customer-service/)
  * [ API References ](../../api-reference/autogen/AfterWork/)
  * [ User Stories ](../../user-stories/2025-02-11-NOVA/nova/)
  * [ Contributor Guide ](../../contributor-guide/contributing/)
  * [ FAQs ](../../faq/FAQ/)
  * [ Ecosystem ](../../ecosystem/agentops/)
  * [ Blog ](../../blog)



[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home  ](../../..)

Home 
    * Home  [ Home  ](./) Table of contents 
      * [ Key Features  ](#key-features)
      * [ Explore content  ](#explore-content)
      * [ Popular resources  ](#popular-resources)
    * [ Quick Start  ](../quick-start/)
  * [ User Guide  ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases  ](../../use-cases/use-cases/customer-service/)
  * [ API References  ](../../api-reference/autogen/AfterWork/)
  * [ User Stories  ](../../user-stories/2025-02-11-NOVA/nova/)
  * [ Contributor Guide  ](../../contributor-guide/contributing/)
  * [ FAQs  ](../../faq/FAQ/)
  * [ Ecosystem  ](../../ecosystem/agentops/)
  * [ Blog  ](../../blog)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/home/home.mdx "Edit this page")

# Home

![AG2 Logo](../../../assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](../quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](../../../assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](../../../assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](../../../assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](../quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](../../user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](../../user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](../../use-cases/use-cases/customer-service) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](../../use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](../../api-reference/autogen/AfterWork) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](../../contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 month ago2025-02-28

Back to top  [ Previous  ag2  ](../../..) [ Next  Quick Start  ](../quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/user-stories/2025-02-11-NOVA/nova

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.4

[ Skip to content ](#key-features)

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../..)

[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2")

AG2 

0.8.4

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](../../..)
  * [ User Guide ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases ](../../use-cases/use-cases/customer-service/)
  * [ API References ](../../api-reference/autogen/AfterWork/)
  * [ User Stories ](../../user-stories/2025-02-11-NOVA/nova/)
  * [ Contributor Guide ](../../contributor-guide/contributing/)
  * [ FAQs ](../../faq/FAQ/)
  * [ Ecosystem ](../../ecosystem/agentops/)
  * [ Blog ](../../blog)



[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home  ](../../..)

Home 
    * Home  [ Home  ](./) Table of contents 
      * [ Key Features  ](#key-features)
      * [ Explore content  ](#explore-content)
      * [ Popular resources  ](#popular-resources)
    * [ Quick Start  ](../quick-start/)
  * [ User Guide  ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases  ](../../use-cases/use-cases/customer-service/)
  * [ API References  ](../../api-reference/autogen/AfterWork/)
  * [ User Stories  ](../../user-stories/2025-02-11-NOVA/nova/)
  * [ Contributor Guide  ](../../contributor-guide/contributing/)
  * [ FAQs  ](../../faq/FAQ/)
  * [ Ecosystem  ](../../ecosystem/agentops/)
  * [ Blog  ](../../blog)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/home/home.mdx "Edit this page")

# Home

![AG2 Logo](../../../assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](../quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](../../../assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](../../../assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](../../../assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](../quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](../../user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](../../user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](../../use-cases/use-cases/customer-service) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](../../use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](../../api-reference/autogen/AfterWork) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](../../contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 month ago2025-02-28

Back to top  [ Previous  ag2  ](../../..) [ Next  Quick Start  ](../quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.3

[ Skip to content ](#key-features)

You're viewing the **work in progress** version of the documentation. Please click [**here**](http://docs.ag2.ai) for the latest. 

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../..)

[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2")

AG2 

0.8.3

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](../../..)
  * [ User Guide ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases ](../../use-cases/use-cases/customer-service/)
  * [ API References ](../../api-reference/autogen/AfterWork/)
  * [ User Stories ](../../user-stories/2025-02-11-NOVA)
  * [ Contributor Guide ](../../contributor-guide/contributing/)
  * [ FAQs ](../../faq/FAQ/)
  * [ Ecosystem ](../../ecosystem/agentops/)
  * [ Blog ](../../blog)



[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home  ](../../..)

Home 
    * Home  [ Home  ](./) Table of contents 
      * [ Key Features  ](#key-features)
      * [ Explore content  ](#explore-content)
      * [ Popular resources  ](#popular-resources)
    * [ Quick Start  ](../quick-start/)
  * [ User Guide  ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases  ](../../use-cases/use-cases/customer-service/)
  * [ API References  ](../../api-reference/autogen/AfterWork/)
  * [ User Stories  ](../../user-stories/2025-02-11-NOVA)
  * [ Contributor Guide  ](../../contributor-guide/contributing/)
  * [ FAQs  ](../../faq/FAQ/)
  * [ Ecosystem  ](../../ecosystem/agentops/)
  * [ Blog  ](../../blog)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/home/home.mdx "Edit this page")

# Home

![AG2 Logo](/assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](/docs/home/quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](/assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](/assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](/assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](/docs/home/quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](/docs/user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](/docs/user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](/docs/use-cases/use-cases/) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](/docs/use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](/docs/api-reference/autogen) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](/docs/contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 month ago2025-02-28

Back to top  [ Previous  ag2  ](../../..) [ Next  Quick Start  ](../quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: http://docs.ag2.ai/

Redirecting to [latest/](latest/)... 


---



## Untitled Page
URL: https://docs.ag2.ai/user-stories/2025-02-11-NOVA

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/docs/home/quick-start

[ Skip to content ](#set-up-your-environment)

You're not viewing the latest version. [ **Click here to go to latest.** ](../../..)

[ ![logo](../../assets/img/logo.svg) ](../.. "AG2")

AG2 

0.9dev

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Quick Start 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](./)
  * [ User Guide ](../user-guide/basic-concepts/installing-ag2/)
  * [ API References ](../api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](../contributor-guide/contributing/)
  * [ Ecosystem ](../ecosystem/agentops/)
  * [ Use Cases ](../use-cases/use-cases/customer-service/)
  * [ Community Insights ](../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](../blog/)



[ ![logo](../../assets/img/logo.svg) ](../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * Quick Start  [ Quick Start  ](./) Table of contents 
    * [ Set Up Your Environment  ](#set-up-your-environment)
    * [ Build Your First Agent Workflow  ](#build-your-first-agent-workflow)
    * [ Run Your Example  ](#run-your-example)
  * [ User Guide  ](../user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](../api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](../contributor-guide/contributing/)
  * [ Ecosystem  ](../ecosystem/agentops/)
  * [ Use Cases  ](../use-cases/use-cases/customer-service/)
  * [ Community Insights  ](../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](../blog/)



Table of contents 

  * [ Set Up Your Environment  ](#set-up-your-environment)
  * [ Build Your First Agent Workflow  ](#build-your-first-agent-workflow)
  * [ Run Your Example  ](#run-your-example)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/quick-start.mdx "Edit this page")

# Quick Start

Get up and running with AG2 in just **3 minutes**! This guide will help you set up your environment and build your very first multi-agent workflow. In just a few steps, you'll have your first agent up and running. Let's make it happen!

### Set Up Your Environment[#](#set-up-your-environment "Permanent link")

Tip

We recommended using a virtual environment for your project to keep your packages contained. See [venv](https://docs.python.org/3/library/venv.html).

**Install AG2**

AG2 requires **Python version >= 3.9, < 3.14**. Install AG2 with OpenAI integration using pip:

```
`[](#__codelineno-0-1)pipinstallag2[openai] `
```

The package is available under `ag2`, `pyautogen`, or `autogen` names. The default installation includes minimal dependencies, you can add extra options based on your specific requirements.

Warning

**From version 0.8** : The OpenAI package, `openai`, is not installed by default.

Install AG2 with your preferred model provider(s), for example:

  * `pip install ag2[openai]`
  * `pip install ag2[gemini]`
  * `pip install ag2[anthropic,cohere,mistral]`



On Mac OS, if you get "no matches found:", add a quote to the package name, for example: - `pip install "ag2[openai]"`

### Build Your First Agent Workflow[#](#build-your-first-agent-workflow "Permanent link")

Let’s create a poetic AI agent using AG2. This example shows how to create a simple, conversational agent that responds in rhyme.

Create a Python script called `first_agent.py`, and paste the following code into it:

```
`[](#__codelineno-1-1)# 1. Import our agent class [](#__codelineno-1-2)fromautogenimport ConversableAgent, LLMConfig [](#__codelineno-1-3) [](#__codelineno-1-4)# 2. Define our LLM configuration for OpenAI's GPT-4o mini [](#__codelineno-1-5)# uses the OPENAI_API_KEY environment variable [](#__codelineno-1-6)llm_config = LLMConfig(api_type="openai", model="gpt-4o-mini") [](#__codelineno-1-7) [](#__codelineno-1-8)# 3. Create our LLM agent [](#__codelineno-1-9)with llm_config: [](#__codelineno-1-10) my_agent = ConversableAgent( [](#__codelineno-1-11) name="helpful_agent", [](#__codelineno-1-12) system_message="You are a poetic AI assistant, respond in rhyme.", [](#__codelineno-1-13) ) [](#__codelineno-1-14) [](#__codelineno-1-15)# 4. Run the agent with a prompt [](#__codelineno-1-16)response = my_agent.run( [](#__codelineno-1-17) message="In one sentence, what's the big deal about AI?", [](#__codelineno-1-18) max_turns=3, [](#__codelineno-1-19)) [](#__codelineno-1-20) [](#__codelineno-1-21)# 5. Iterate through the chat automatically with console output [](#__codelineno-1-22)response.process() [](#__codelineno-1-23) [](#__codelineno-1-24)# 6. Print the chat [](#__codelineno-1-25)print(response.messages) `
```

Note

Before running this code, make sure to set your `OPENAI_API_KEY` as an environment variable. This example uses `gpt-4o-mini`, but you can replace it with any other [model](../user-guide/models/amazon-bedrock) supported by AG2.

[macOS / Linux](#__tabbed_1_1)[Windows](#__tabbed_1_2)

```
`[](#__codelineno-2-1)export OPENAI_API_KEY="YOUR_API_KEY" `
```

```
`[](#__codelineno-3-1)setx OPENAI_API_KEY "YOUR_API_KEY" `
```

### Run Your Example[#](#run-your-example "Permanent link")

Now you're ready to see your agent in action!

In your terminal, run:

```
`[](#__codelineno-4-1)pythonfirst_agent.py `
```

That's it—you've built your first multi-agent system with AG2! Your poetic agent is now live and ready to charm with rhymes 🎉

6 hours ago2025-04-10

Back to top  [ Next  Installing AG2  ](../user-guide/basic-concepts/installing-ag2/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/docs/use-cases/use-cases

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/docs/api-reference/autogen

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.2

[ Skip to content ](#key-features)

You're viewing the **work in progress** version of the documentation. Please click [**here**](http://docs.ag2.ai) for the latest. 

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../..)

[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2")

AG2 

0.8.2

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](../../..)
  * [ User Guide ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases ](../../use-cases/use-cases/customer-service/)
  * [ API References ](../../api-reference/autogen/AfterWork/)
  * [ User Stories ](../../user-stories/2025-02-11-NOVA)
  * [ Contributor Guide ](../../contributor-guide/contributing/)
  * [ FAQs ](../../faq/FAQ/)
  * [ Ecosystem ](../../ecosystem/agentops/)
  * [ Blog ](../../blog)



[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home  ](../../..)

Home 
    * Home  [ Home  ](./) Table of contents 
      * [ Key Features  ](#key-features)
      * [ Explore content  ](#explore-content)
      * [ Popular resources  ](#popular-resources)
    * [ Quick Start  ](../quick-start/)
  * [ User Guide  ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases  ](../../use-cases/use-cases/customer-service/)
  * [ API References  ](../../api-reference/autogen/AfterWork/)
  * [ User Stories  ](../../user-stories/2025-02-11-NOVA)
  * [ Contributor Guide  ](../../contributor-guide/contributing/)
  * [ FAQs  ](../../faq/FAQ/)
  * [ Ecosystem  ](../../ecosystem/agentops/)
  * [ Blog  ](../../blog)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/home/home.mdx "Edit this page")

# Home

![AG2 Logo](/assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](/docs/home/quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](/assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](/assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](/assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](/docs/home/quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](/docs/user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](/docs/user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](/docs/use-cases/use-cases/) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](/docs/use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](/docs/api-reference/autogen) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](/docs/contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 month ago2025-02-28

Back to top  [ Previous  ag2  ](../../..) [ Next  Quick Start  ](../quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.1

[ Skip to content ](#key-features)

You're viewing the **work in progress** version of the documentation. Please click [**here**](http://docs.ag2.ai) for the latest. 

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../..)

[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2")

AG2 

0.8.1

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](../../..)
  * [ User Guide ](../../user-guide/basic-concepts/installing-ag2/)
  * [ API References ](../../api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](../../contributor-guide/contributing/)
  * [ FAQs ](../../faq/FAQ/)
  * [ Ecosystem ](../../ecosystem/agentops/)
  * [ Blog ](../../blog)



[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home  ](../../..)

Home 
    * Home  [ Home  ](./) Table of contents 
      * [ Key Features  ](#key-features)
      * [ Explore content  ](#explore-content)
      * [ Popular resources  ](#popular-resources)
    * [ Quick Start  ](../quick-start/)
  * [ User Guide  ](../../user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](../../api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](../../contributor-guide/contributing/)
  * [ FAQs  ](../../faq/FAQ/)
  * [ Ecosystem  ](../../ecosystem/agentops/)
  * [ Blog  ](../../blog)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/website/mkdocs/docs/docs/home/home.md "Edit this page")

# Home

![AG2 Logo](/assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](/docs/home/quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](/assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](/assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](/assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](/docs/home/quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](/docs/user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](/docs/user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](/docs/use-cases/use-cases/) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](/docs/use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](/docs/api-reference/autogen) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](/docs/contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 month ago2025-02-28

Back to top  [ Previous  ag2  ](../../..) [ Next  Quick Start  ](../quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.8.0

[ Skip to content ](#key-features)

You're viewing the **work in progress** version of the documentation. Please click [**here**](http://docs.ag2.ai) for the latest. 

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../..)

[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2")

AG2 

0.8.0

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](../../..)
  * [ User Guide ](../../user-guide/basic-concepts/installing-ag2/)
  * [ API References ](../../api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](../../contributor-guide/contributing/)
  * [ FAQs ](../../faq/FAQ/)
  * [ Ecosystem ](../../ecosystem/agentops/)



[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home  ](../../..)

Home 
    * Home  [ Home  ](./) Table of contents 
      * [ Key Features  ](#key-features)
      * [ Explore content  ](#explore-content)
      * [ Popular resources  ](#popular-resources)
    * [ Quick Start  ](../quick-start/)
  * [ User Guide  ](../../user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](../../api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](../../contributor-guide/contributing/)
  * [ FAQs  ](../../faq/FAQ/)
  * [ Ecosystem  ](../../ecosystem/agentops/)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/website/mkdocs/docs/docs/home/home.md "Edit this page")

# Home

![AG2 Logo](/assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](/docs/home/quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](/assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](/assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](/assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](/docs/home/quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](/docs/user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](/docs/user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](/docs/use-cases/use-cases/) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](/docs/use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](/docs/api-reference/autogen) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](/docs/contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 month ago2025-02-28

Back to top  [ Previous  ag2  ](../../..) [ Next  Quick Start  ](../quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/quick-start

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/basic-concepts/installing-ag2

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/latest

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/api-reference/autogen/AfterWork

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/api-reference/latest

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/contributor-guide/contributing

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/ecosystem/agentops

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/use-cases/use-cases/customer-service

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/use-cases/latest

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/user-stories/2025-04-04-AgentWeb/agentweb

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/user-stories/latest

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/blog

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/basic-concepts/llm-configuration/llm-configuration

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/basic-concepts/latest

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/advanced-concepts/rag

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/amazon-bedrock

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/models

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/cerebras

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/cohere

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/deepseek-v3

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/google-gemini

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/google-vertexai

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/groq

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/litellm-proxy-server/installation

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/latest

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/lm-studio

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/mistralai

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/ollama

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/openai

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/togetherai

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/vLLM

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/reference-agents

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/reference-tools

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/faq/FAQ

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/use-cases/notebooks/notebooks/agentchat_structured_outputs

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/latest/use-cases/notebooks/latest

You're not viewing the latest version. [ **Click here to go to latest.** ](..//latest)

[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Initializing search 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](/latest/docs/quick-start/)
  * [ User Guide ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](/latest/docs/blog/)



[ ![logo](/latest/assets/img/logo.svg) ](/latest/. "AG2") AG2 

[ ag2ai/ag2  ](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](/latest/docs/quick-start/)
  * [ User Guide  ](/latest/docs/user-guide/basic-concepts/installing-ag2/)
  * [ API References  ](/latest/docs/api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](/latest/docs/contributor-guide/contributing/)
  * [ Ecosystem  ](/latest/docs/ecosystem/agentops/)
  * [ Use Cases  ](/latest/docs/use-cases/use-cases/customer-service/)
  * [ Community Insights  ](/latest/docs/user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](/latest/docs/blog/)



# 404 - Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

Back to top 

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/

Redirecting to [latest/](latest/)... 


---



## Untitled Page
URL: https://docs.ag2.ai/

Redirecting to [latest/](latest/)... 


---



## Untitled Page
URL: https://docs.ag2.ai/latest/docs/user-guide/models/anthropic

[ Skip to content ](#features)

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../../..)

[ ![logo](../../../../assets/img/logo.svg) ](../../../.. "AG2")

AG2 

0.8.6

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Anthropic 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start ](../../../quick-start/)
  * [ User Guide ](../../basic-concepts/installing-ag2/)
  * [ API References ](../../../api-reference/autogen/AfterWork/)
  * [ Contributor Guide ](../../../contributor-guide/contributing/)
  * [ Ecosystem ](../../../ecosystem/agentops/)
  * [ Use Cases ](../../../use-cases/use-cases/customer-service/)
  * [ Community Insights ](../../../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog ](../../../blog/)



[ ![logo](../../../../assets/img/logo.svg) ](../../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Quick Start  ](../../../quick-start/)
  * User Guide  User Guide 
    * [ Installing AG2  ](../../basic-concepts/installing-ag2/)
    * [ Basic Concepts  ](../../basic-concepts/llm-configuration/llm-configuration/)
    * [ Advanced Concepts  ](../../advanced-concepts/rag/)
    * Model Providers  Model Providers 
      * [ Amazon Bedrock  ](../amazon-bedrock/)
      * Anthropic  [ Anthropic  ](./) Table of contents 
        * [ Features  ](#features)
        * [ Requirements  ](#requirements)
        * [ Set the config for the Anthropic API  ](#set-the-config-for-the-anthropic-api)
          * [ Alternative  ](#alternative)
          * [ Alternative Anthropic VertexAI Client (GCP)  ](#alternative-anthropic-vertexai-client-gcp)
          * [ Alternative Anthropic VertexAI Client (Google Default Authentication)  ](#alternative-anthropic-vertexai-client-google-default-authentication)
        * [ Two-agent Coding Example  ](#two-agent-coding-example)
          * [ Construct Agents  ](#construct-agents)
        * [ Tool Call Example with the Latest Anthropic API  ](#tool-call-example-with-the-latest-anthropic-api)
          * [ Register the function  ](#register-the-function)
        * [ Group Chat Example with both Claude and GPT Agents  ](#group-chat-example-with-both-claude-and-gpt-agents)
          * [ A group chat with GPT-4 as the judge  ](#a-group-chat-with-gpt-4-as-the-judge)
          * [ Same group chat with Claude 3.5 Sonnet as the judge  ](#same-group-chat-with-claude-35-sonnet-as-the-judge)
      * [ Cerebras  ](../cerebras/)
      * [ Cohere  ](../cohere/)
      * [ DeepSeek  ](../deepseek-v3/)
      * [ Google Gemini  ](../google-gemini/)
      * [ Google Vertex AI  ](../google-vertexai/)
      * [ Groq  ](../groq/)
      * [ LiteLLM Proxy Server  ](../litellm-proxy-server/installation/)
      * [ LM Studio  ](../lm-studio/)
      * [ Mistral AI  ](../mistralai/)
      * [ Ollama  ](../ollama/)
      * [ OpenAI  ](../openai/)
      * [ Together AI  ](../togetherai/)
      * [ vLLM  ](../vLLM/)
    * [ Reference Agents  ](../../reference-agents/)
    * [ Reference Tools  ](../../reference-tools/)
    * [ FAQ  ](../../../faq/FAQ/)
  * [ API References  ](../../../api-reference/autogen/AfterWork/)
  * [ Contributor Guide  ](../../../contributor-guide/contributing/)
  * [ Ecosystem  ](../../../ecosystem/agentops/)
  * [ Use Cases  ](../../../use-cases/use-cases/customer-service/)
  * [ Community Insights  ](../../../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Blog  ](../../../blog/)



Table of contents 

  * [ Features  ](#features)
  * [ Requirements  ](#requirements)
  * [ Set the config for the Anthropic API  ](#set-the-config-for-the-anthropic-api)
    * [ Alternative  ](#alternative)
    * [ Alternative Anthropic VertexAI Client (GCP)  ](#alternative-anthropic-vertexai-client-gcp)
    * [ Alternative Anthropic VertexAI Client (Google Default Authentication)  ](#alternative-anthropic-vertexai-client-google-default-authentication)
  * [ Two-agent Coding Example  ](#two-agent-coding-example)
    * [ Construct Agents  ](#construct-agents)
  * [ Tool Call Example with the Latest Anthropic API  ](#tool-call-example-with-the-latest-anthropic-api)
    * [ Register the function  ](#register-the-function)
  * [ Group Chat Example with both Claude and GPT Agents  ](#group-chat-example-with-both-claude-and-gpt-agents)
    * [ A group chat with GPT-4 as the judge  ](#a-group-chat-with-gpt-4-as-the-judge)
    * [ Same group chat with Claude 3.5 Sonnet as the judge  ](#same-group-chat-with-claude-35-sonnet-as-the-judge)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/user-guide/models/anthropic.mdx "Edit this page")

# Anthropic

Anthropic's Claude is a family of large language models developed by Anthropic and designed to revolutionize the way you interact with AI. Claude excels at a wide variety of tasks involving language, reasoning, analysis, coding, and more. The models are highly capable, easy to use, and can be customized to suit your needs.

In this notebook, we demonstrate how to use Anthropic Claude model for AgentChat in AG2.

## Features[#](#features "Permanent link")

  * Function/tool calling
  * Structured Outputs ([Notebook example](../../../use-cases/notebooks/notebooks/agentchat_structured_outputs))
  * Token usage and cost correctly as per Anthropic's API costs (as of December 2024)



## Requirements[#](#requirements "Permanent link")

To use Anthropic Claude with AG2, first you need to install the `ag2[anthropic]` package.

To try out the function call feature of Claude model, you need to install `anthropic>=0.23.1`.

```
`[](#__codelineno-0-1)# If you need to install AG2 with Anthropic [](#__codelineno-0-2)pipinstallag2[anthropic] `
```

Tip

If you have been using `autogen` or `pyautogen`, all you need to do is upgrade it using: 

```
`[](#__codelineno-1-1)pipinstall-Uautogen[anthropic] `
```

or 

```
`[](#__codelineno-2-1)pipinstall-Upyautogen[anthropic] `
```

as `pyautogen`, `autogen`, and `ag2` are aliases for the same PyPI package. 

## Set the config for the Anthropic API[#](#set-the-config-for-the-anthropic-api "Permanent link")

You can add any parameters that are needed for the custom model loading in the same configuration list.

It is important to add the `api_type` field and set it to a string that corresponds to the client type used: `anthropic`.

Example: 

```
`[](#__codelineno-3-1)[ [](#__codelineno-3-2) { [](#__codelineno-3-3) "model": "claude-3-5-sonnet-20240620", [](#__codelineno-3-4) "api_key": "your Anthropic API Key goes here", [](#__codelineno-3-5) "api_type": "anthropic", [](#__codelineno-3-6) }, [](#__codelineno-3-7) { [](#__codelineno-3-8) "model": "claude-3-sonnet-20240229", [](#__codelineno-3-9) "api_key": "your Anthropic API Key goes here", [](#__codelineno-3-10) "api_type": "anthropic", [](#__codelineno-3-11) "temperature": 0.5, [](#__codelineno-3-12) "top_p": 0.2, # Note: It is recommended to set temperature or top_p but not both. [](#__codelineno-3-13) "max_tokens": 10000, [](#__codelineno-3-14) }, [](#__codelineno-3-15) { [](#__codelineno-3-16) "model":"claude-3-opus-20240229", [](#__codelineno-3-17) "api_key":"your api key", [](#__codelineno-3-18) "api_type":"anthropic", [](#__codelineno-3-19) }, [](#__codelineno-3-20) { [](#__codelineno-3-21) "model":"claude-2.0", [](#__codelineno-3-22) "api_key":"your api key", [](#__codelineno-3-23) "api_type":"anthropic", [](#__codelineno-3-24) }, [](#__codelineno-3-25) { [](#__codelineno-3-26) "model":"claude-2.1", [](#__codelineno-3-27) "api_key":"your api key", [](#__codelineno-3-28) "api_type":"anthropic", [](#__codelineno-3-29) }, [](#__codelineno-3-30) { [](#__codelineno-3-31) "model":"claude-3.0-haiku", [](#__codelineno-3-32) "api_key":"your api key", [](#__codelineno-3-33) "api_type":"anthropic", [](#__codelineno-3-34) }, [](#__codelineno-3-35)] `
```

### Alternative[#](#alternative "Permanent link")

As an alternative to the api_key key and value in the config, you can set the environment variable `ANTHROPIC_API_KEY` to your Anthropic API key.

Linux/Mac: 

```
`[](#__codelineno-4-1)export ANTHROPIC_API_KEY="your Anthropic API key here" `
```

Windows: 

```
`[](#__codelineno-5-1)set ANTHROPIC_API_KEY=your_anthropic_api_key_here `
```

```
`[](#__codelineno-6-1)importos [](#__codelineno-6-2) [](#__codelineno-6-3)fromtyping_extensionsimport Annotated [](#__codelineno-6-4) [](#__codelineno-6-5)importautogen [](#__codelineno-6-6) [](#__codelineno-6-7)llm_config_claude = autogen.LLMConfig( [](#__codelineno-6-8) # Choose your model name. [](#__codelineno-6-9) model="claude-3-5-sonnet-20240620", [](#__codelineno-6-10) # You need to provide your API key here. [](#__codelineno-6-11) api_key=os.getenv("ANTHROPIC_API_KEY"), [](#__codelineno-6-12) api_type="anthropic", [](#__codelineno-6-13)) `
```

### Alternative Anthropic VertexAI Client (GCP)[#](#alternative-anthropic-vertexai-client-gcp "Permanent link")

To use the Anthropic VertexAI client in AG2, you need to configure it for use with Google Cloud Platform (GCP). Ensure you have the necessary project credentials and install the required package.

Configuration

The following configuration example demonstrates how to set up Anthropic VertexAI:

```
`[](#__codelineno-7-1)importos [](#__codelineno-7-2) [](#__codelineno-7-3)llm_config_vertexai = LLMConfig( [](#__codelineno-7-4) model="claude-3-5-sonnet-20240620-v1:0", [](#__codelineno-7-5) gcp_project_id="your_project_id", [](#__codelineno-7-6) gcp_region="us-west-2", # Replace with your GCP region [](#__codelineno-7-7) gcp_auth_token=None, # Optional: If not passed, Google Default Authentication will be used [](#__codelineno-7-8) api_type="anthropic", [](#__codelineno-7-9)) [](#__codelineno-7-10) [](#__codelineno-7-11)with llm_config_vertexai: [](#__codelineno-7-12) assistant = autogen.AssistantAgent("assistant") `
```

### Alternative Anthropic VertexAI Client (Google Default Authentication)[#](#alternative-anthropic-vertexai-client-google-default-authentication "Permanent link")

If the `gcp_auth_token` is not provided in the configuration, the client will use Google’s default authentication mechanism. This requires the appropriate credentials to be configured in your environment, such as:

  * Service account key: You can set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to your service account key file.
  * Cloud Shell or GCP Compute Engine: When running in a GCP-managed environment, default authentication is automatically applied.



Example of setting up the environment variable:

```
`[](#__codelineno-8-1)exportGOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json" `
```

This allows seamless integration without explicitly specifying the authentication token in your code.

## Two-agent Coding Example[#](#two-agent-coding-example "Permanent link")

### Construct Agents[#](#construct-agents "Permanent link")

Construct a simple conversation between a User proxy and an ConversableAgent based on Claude-3 model.

```
`[](#__codelineno-9-1)with llm_config_claude: [](#__codelineno-9-2) assistant = autogen.AssistantAgent("assistant") [](#__codelineno-9-3) [](#__codelineno-9-4)user_proxy = autogen.UserProxyAgent( [](#__codelineno-9-5) "user_proxy", [](#__codelineno-9-6) human_input_mode="NEVER", [](#__codelineno-9-7) code_execution_config={ [](#__codelineno-9-8) "work_dir": "coding", [](#__codelineno-9-9) "use_docker": False, [](#__codelineno-9-10) }, [](#__codelineno-9-11) is_termination_msg=lambda x: x.get("content", "") and x.get("content", "").rstrip().endswith("TERMINATE"), [](#__codelineno-9-12) max_consecutive_auto_reply=1, [](#__codelineno-9-13)) [](#__codelineno-9-14) [](#__codelineno-9-15)user_proxy.initiate_chat( [](#__codelineno-9-16) assistant, message="Write a python program to print the first 10 numbers of the Fibonacci sequence." [](#__codelineno-9-17)) `
```

```
`[](#__codelineno-10-1)user_proxy (to assistant): [](#__codelineno-10-2) [](#__codelineno-10-3)Write a python program to print the first 10 numbers of the Fibonacci sequence. [](#__codelineno-10-4) [](#__codelineno-10-5)-------------------------------------------------------------------------------- [](#__codelineno-10-6)assistant (to user_proxy): [](#__codelineno-10-7) [](#__codelineno-10-8)Certainly! I'll write a Python program to print the first 10 numbers of the Fibonacci sequence. Here's the code: [](#__codelineno-10-9) [](#__codelineno-10-10)'''python [](#__codelineno-10-11)# filename:fibonacci.py [](#__codelineno-10-12) [](#__codelineno-10-13)def fibonacci(n): [](#__codelineno-10-14) fib_sequence = [0, 1] [](#__codelineno-10-15) [](#__codelineno-10-16) while len(fib_sequence) < n: [](#__codelineno-10-17) next_number = fib_sequence[-1] + fib_sequence[-2] [](#__codelineno-10-18) fib_sequence.append(next_number) [](#__codelineno-10-19) [](#__codelineno-10-20) return fib_sequence [](#__codelineno-10-21) [](#__codelineno-10-22)# Printthefirst10numbersoftheFibonaccisequence [](#__codelineno-10-23)n = 10 [](#__codelineno-10-24)result = fibonacci(n) [](#__codelineno-10-25)print(f"The first {n} numbers of the Fibonacci sequence are:") [](#__codelineno-10-26)print(result) [](#__codelineno-10-27)''' [](#__codelineno-10-28) [](#__codelineno-10-29)This program does the following: [](#__codelineno-10-30) [](#__codelineno-10-31)1. We define a function called `fibonacci` that takes an argument `n`, which is the number of Fibonacci numbers we want to generate. [](#__codelineno-10-32)2. We initialize the `fib_sequence` list with the first two numbers of the Fibonacci sequence: 0 and 1. [](#__codelineno-10-33)3. We use a while loop to generate subsequent numbers in the sequence by adding the last two numbers until we have `n` numbers in the sequence. [](#__codelineno-10-34)4. We return the complete Fibonacci sequence. [](#__codelineno-10-35)5. Outside the function, we set `n = 10` to get the first 10 numbers. [](#__codelineno-10-36)6. We call the `fibonacci` function with `n = 10` and store the result in the `result` variable. [](#__codelineno-10-37)7. Finally, we print the result. [](#__codelineno-10-38) [](#__codelineno-10-39)Let's run this code and see the output. The code will be saved in a file named "fibonacci.py". You can execute it using Python. [](#__codelineno-10-40) [](#__codelineno-10-41)-------------------------------------------------------------------------------- [](#__codelineno-10-42) [](#__codelineno-10-43)>>>>>>>> EXECUTING CODE BLOCK 0 (inferred language is python)... [](#__codelineno-10-44)user_proxy (to assistant): [](#__codelineno-10-45) [](#__codelineno-10-46)exitcode: 0 (execution succeeded) [](#__codelineno-10-47)Code output: [](#__codelineno-10-48)The first 10 numbers of the Fibonacci sequence are: [](#__codelineno-10-49)[0, 1, 1, 2, 3, 5, 8, 13, 21, 34] [](#__codelineno-10-50) [](#__codelineno-10-51)-------------------------------------------------------------------------------- [](#__codelineno-10-52)assistant (to user_proxy): [](#__codelineno-10-53) [](#__codelineno-10-54)Excellent! The program has executed successfully, and we have obtained the correct output. Let's verify the result: [](#__codelineno-10-55) [](#__codelineno-10-56)The first 10 numbers of the Fibonacci sequence are indeed: [](#__codelineno-10-57)[0, 1, 1, 2, 3, 5, 8, 13, 21, 34] [](#__codelineno-10-58) [](#__codelineno-10-59)This is correct because: [](#__codelineno-10-60)1. The sequence starts with 0 and 1. [](#__codelineno-10-61)2. Each subsequent number is the sum of the two preceding numbers. [](#__codelineno-10-62)3. We can verify this by checking a few numbers: [](#__codelineno-10-63) - 1 = 0 + 1 [](#__codelineno-10-64) - 2 = 1 + 1 [](#__codelineno-10-65) - 3 = 1 + 2 [](#__codelineno-10-66) - 5 = 2 + 3 [](#__codelineno-10-67) - 8 = 3 + 5 [](#__codelineno-10-68) and so on... [](#__codelineno-10-69) [](#__codelineno-10-70)The program has successfully generated and printed the first 10 numbers of the Fibonacci sequence. The task is completed correctly. [](#__codelineno-10-71) [](#__codelineno-10-72)TERMINATE [](#__codelineno-10-73) [](#__codelineno-10-74)-------------------------------------------------------------------------------- `
```

## Tool Call Example with the Latest Anthropic API[#](#tool-call-example-with-the-latest-anthropic-api "Permanent link")

Anthropic announced that tool use is supported in the Anthropic API. To use this feature, please install `anthropic>=0.23.1`.

### Register the function[#](#register-the-function "Permanent link")

```
`[](#__codelineno-11-1)@user_proxy.register_for_execution() # Decorator factory for registering a function to be executed by an agent [](#__codelineno-11-2)@assistant.register_for_llm( [](#__codelineno-11-3) name="get_weather", description="Get the current weather in a given location." [](#__codelineno-11-4)) # Decorator factory for registering a function to be used by an agent [](#__codelineno-11-5)defpreprocess(location: Annotated[str, "The city and state, e.g. Toronto, ON."]) -> str: [](#__codelineno-11-6) return "Absolutely cloudy and rainy" [](#__codelineno-11-7) [](#__codelineno-11-8)user_proxy.initiate_chat( [](#__codelineno-11-9) assistant, [](#__codelineno-11-10) message="What's the weather in Toronto?", [](#__codelineno-11-11)) `
```

```
`[](#__codelineno-12-1)user_proxy (to assistant): [](#__codelineno-12-2) [](#__codelineno-12-3)What's the weather in Toronto? [](#__codelineno-12-4) [](#__codelineno-12-5)-------------------------------------------------------------------------------- [](#__codelineno-12-6)assistant (to user_proxy): [](#__codelineno-12-7) [](#__codelineno-12-8)To get the weather in Toronto, we can use the available `get_weather` function. Let's call it to retrieve the current weather information for Toronto. [](#__codelineno-12-9)***** Suggested tool call (toolu_01KFiJWsMwTbcWerTHCgytuX): get_weather ***** [](#__codelineno-12-10)Arguments: [](#__codelineno-12-11){"location": "Toronto, ON"} [](#__codelineno-12-12)***************************************************************************** [](#__codelineno-12-13) [](#__codelineno-12-14)-------------------------------------------------------------------------------- [](#__codelineno-12-15) [](#__codelineno-12-16)>>>>>>>> EXECUTING FUNCTION get_weather... [](#__codelineno-12-17)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-12-18)user_proxy (to assistant): [](#__codelineno-12-19) [](#__codelineno-12-20)user_proxy (to assistant): [](#__codelineno-12-21) [](#__codelineno-12-22)***** Response from calling tool (toolu_01KFiJWsMwTbcWerTHCgytuX) ***** [](#__codelineno-12-23)Absolutely cloudy and rainy [](#__codelineno-12-24)*********************************************************************** [](#__codelineno-12-25) [](#__codelineno-12-26)-------------------------------------------------------------------------------- [](#__codelineno-12-27)assistant (to user_proxy): [](#__codelineno-12-28) [](#__codelineno-12-29)Based on the information provided by the weather tool, the current weather in Toronto, ON is absolutely cloudy and rainy. [](#__codelineno-12-30) [](#__codelineno-12-31)To provide a more detailed explanation: [](#__codelineno-12-32) [](#__codelineno-12-33)1. Cloud cover: The weather is described as "absolutely cloudy," which means the sky is likely completely overcast with clouds. This suggests there is little to no visible sunlight making it through the cloud cover. [](#__codelineno-12-34) [](#__codelineno-12-35)2. Precipitation: It is also reported as "rainy," indicating that there is ongoing rainfall in Toronto. The intensity of the rain isn't specified, so it could range from a light drizzle to a heavier downpour. [](#__codelineno-12-36) [](#__codelineno-12-37)This weather condition is not uncommon for Toronto, as the city can experience various types of weather throughout the year. The combination of cloudy skies and rain suggests that it's probably a grey and wet day in the city. [](#__codelineno-12-38) [](#__codelineno-12-39)If you need any more specific information about the weather in Toronto or have any other questions, please feel free to ask. [](#__codelineno-12-40) [](#__codelineno-12-41)TERMINATE [](#__codelineno-12-42) [](#__codelineno-12-43)-------------------------------------------------------------------------------- `
```

## Group Chat Example with both Claude and GPT Agents[#](#group-chat-example-with-both-claude-and-gpt-agents "Permanent link")

### A group chat with GPT-4 as the judge[#](#a-group-chat-with-gpt-4-as-the-judge "Permanent link")

```
`[](#__codelineno-13-1)fromautogenimport AssistantAgent, GroupChat, GroupChatManager, UserProxyAgent, LLMConfig [](#__codelineno-13-2) [](#__codelineno-13-3)llm_config_gpt4 = autogen.LLMConfig( [](#__codelineno-13-4) # Choose your model name. [](#__codelineno-13-5) model="gpt-4", [](#__codelineno-13-6) # You need to provide your API key here. [](#__codelineno-13-7) api_key=os.getenv("OPENAI_API_KEY"), [](#__codelineno-13-8) api_type="openai", [](#__codelineno-13-9)) [](#__codelineno-13-10) [](#__codelineno-13-11)llm_config_gpt35 = autogen.LLMConfig( [](#__codelineno-13-12) # Choose your model name. [](#__codelineno-13-13) model="gpt-3.5-turbo", [](#__codelineno-13-14) # You need to provide your API key here. [](#__codelineno-13-15) api_key=os.getenv("OPENAI_API_KEY"), [](#__codelineno-13-16) api_type="openai", [](#__codelineno-13-17)) [](#__codelineno-13-18) [](#__codelineno-13-19)with llm_config_gpt4: [](#__codelineno-13-20) alice = AssistantAgent( [](#__codelineno-13-21) "Openai_agent", [](#__codelineno-13-22) system_message="You are from OpenAI. You make arguments to support your company's position.", [](#__codelineno-13-23) ) [](#__codelineno-13-24) [](#__codelineno-13-25) dan = AssistantAgent( [](#__codelineno-13-26) "Judge", [](#__codelineno-13-27) system_message="You are a judge. You will evaluate the arguments and make a decision on which one is more convincing.", [](#__codelineno-13-28) ) [](#__codelineno-13-29) [](#__codelineno-13-30)with llm_config_claude: [](#__codelineno-13-31) bob = autogen.AssistantAgent( [](#__codelineno-13-32) "Anthropic_agent", [](#__codelineno-13-33) system_message="You are from Anthropic. You make arguments to support your company's position.", [](#__codelineno-13-34) ) [](#__codelineno-13-35) [](#__codelineno-13-36)with llm_config_gpt35: [](#__codelineno-13-37) charlie = AssistantAgent( [](#__codelineno-13-38) "Research_Assistant", [](#__codelineno-13-39) system_message="You are a helpful assistant to research the latest news and headlines.", [](#__codelineno-13-40) ) [](#__codelineno-13-41) [](#__codelineno-13-42)code_interpreter = UserProxyAgent( [](#__codelineno-13-43) "code-interpreter", [](#__codelineno-13-44) human_input_mode="NEVER", [](#__codelineno-13-45) code_execution_config={ [](#__codelineno-13-46) "work_dir": "coding", [](#__codelineno-13-47) "use_docker": False, [](#__codelineno-13-48) }, [](#__codelineno-13-49) default_auto_reply="", [](#__codelineno-13-50) is_termination_msg=lambda x: x.get("content", "").find("TERMINATE") >= 0, [](#__codelineno-13-51)) [](#__codelineno-13-52) [](#__codelineno-13-53)@code_interpreter.register_for_execution() # Decorator factory for registering a function to be executed by an agent [](#__codelineno-13-54)@charlie.register_for_llm( [](#__codelineno-13-55) name="get_headlines", description="Get the headline of a particular day." [](#__codelineno-13-56)) # Decorator factory for registering a function to be used by an agent [](#__codelineno-13-57)defget_headlines(headline_date: Annotated[str, "Date in MMDDYY format, e.g., 06192024"]) -> str: [](#__codelineno-13-58) mock_news = { [](#__codelineno-13-59) "06202024": "OpenAI competitor Anthropic announces its most powerful AI yet.", [](#__codelineno-13-60) "06192024": "OpenAI founder Sutskever sets up new AI company devoted to safe superintelligence.", [](#__codelineno-13-61) } [](#__codelineno-13-62) return mock_news.get(headline_date, "No news available for today.") [](#__codelineno-13-63) [](#__codelineno-13-64)groupchat = GroupChat( [](#__codelineno-13-65) agents=[alice, bob, charlie, dan, code_interpreter], [](#__codelineno-13-66) messages=[], [](#__codelineno-13-67) allow_repeat_speaker=False, [](#__codelineno-13-68) max_round=10, [](#__codelineno-13-69)) [](#__codelineno-13-70) [](#__codelineno-13-71)manager = GroupChatManager( [](#__codelineno-13-72) groupchat=groupchat, [](#__codelineno-13-73) llm_config=llm_config_gpt4, [](#__codelineno-13-74)) [](#__codelineno-13-75) [](#__codelineno-13-76)task = "Analyze the potential of OpenAI and Anthropic to revolutionize the field of AI based on today's headlines. Today is 06202024." [](#__codelineno-13-77) [](#__codelineno-13-78)user_proxy = UserProxyAgent( [](#__codelineno-13-79) "user_proxy", [](#__codelineno-13-80) human_input_mode="NEVER", [](#__codelineno-13-81) code_execution_config=False, [](#__codelineno-13-82) default_auto_reply="", [](#__codelineno-13-83) # is_termination_msg=lambda x: True, [](#__codelineno-13-84)) [](#__codelineno-13-85) [](#__codelineno-13-86)user_proxy.initiate_chat(manager, message=task) `
```

```
`[](#__codelineno-14-1)user_proxy (to chat_manager): [](#__codelineno-14-2) [](#__codelineno-14-3)Analyze the potential of OpenAI and Anthropic to revolutionize the field of AI based on today's headlines. Today is 06202024. [](#__codelineno-14-4) [](#__codelineno-14-5)-------------------------------------------------------------------------------- [](#__codelineno-14-6) [](#__codelineno-14-7)Next speaker: Research_Assistant [](#__codelineno-14-8) [](#__codelineno-14-9)Research_Assistant (to chat_manager): [](#__codelineno-14-10) [](#__codelineno-14-11)***** Suggested tool call (call_72zG3zis68tGSztVzF6tZhve): get_headlines ***** [](#__codelineno-14-12)Arguments: [](#__codelineno-14-13){"headline_date": "06202024"} [](#__codelineno-14-14)****************************************************************************** [](#__codelineno-14-15)***** Suggested tool call (call_oRxUowu12QV2IVvCieH0qF46): get_headlines ***** [](#__codelineno-14-16)Arguments: [](#__codelineno-14-17){"headline_date": "06202024"} [](#__codelineno-14-18)****************************************************************************** [](#__codelineno-14-19) [](#__codelineno-14-20)-------------------------------------------------------------------------------- [](#__codelineno-14-21) [](#__codelineno-14-22)Next speaker: code-interpreter [](#__codelineno-14-23) [](#__codelineno-14-24)>>>>>>>> EXECUTING FUNCTION get_headlines... [](#__codelineno-14-25)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-14-26) [](#__codelineno-14-27)>>>>>>>> EXECUTING FUNCTION get_headlines... [](#__codelineno-14-28)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-14-29)code-interpreter (to chat_manager): [](#__codelineno-14-30) [](#__codelineno-14-31)code-interpreter (to chat_manager): [](#__codelineno-14-32) [](#__codelineno-14-33)***** Response from calling tool (call_72zG3zis68tGSztVzF6tZhve) ***** [](#__codelineno-14-34)OpenAI competitor Anthropic announces its most powerful AI yet. [](#__codelineno-14-35)********************************************************************** [](#__codelineno-14-36) [](#__codelineno-14-37)-------------------------------------------------------------------------------- [](#__codelineno-14-38)code-interpreter (to chat_manager): [](#__codelineno-14-39) [](#__codelineno-14-40)***** Response from calling tool (call_oRxUowu12QV2IVvCieH0qF46) ***** [](#__codelineno-14-41)OpenAI competitor Anthropic announces its most powerful AI yet. [](#__codelineno-14-42)********************************************************************** [](#__codelineno-14-43) [](#__codelineno-14-44)-------------------------------------------------------------------------------- [](#__codelineno-14-45) [](#__codelineno-14-46)Next speaker: Anthropic_agent [](#__codelineno-14-47) [](#__codelineno-14-48)Anthropic_agent (to chat_manager): [](#__codelineno-14-49) [](#__codelineno-14-50)Thank you for providing that headline. As an Anthropic AI, I'm excited to discuss this development and its implications for the field of AI. [](#__codelineno-14-51) [](#__codelineno-14-52)This announcement of Anthropic's most powerful AI yet is a significant milestone that demonstrates our company's rapid progress and growing capabilities. While I don't have specific details about this new AI system, I can speak to Anthropic's approach and potential to revolutionize the field: [](#__codelineno-14-53) [](#__codelineno-14-54)1. Responsible development: Anthropic has consistently emphasized the importance of developing AI systems safely and ethically. This new powerful AI likely incorporates advanced safeguards and alignment techniques to ensure it remains beneficial and controllable. [](#__codelineno-14-55) [](#__codelineno-14-56)2. Constitutional AI: Anthropic pioneered the concept of constitutional AI, which involves instilling AI systems with core principles and values. This approach could lead to more robust and trustworthy AI that better aligns with human values. [](#__codelineno-14-57) [](#__codelineno-14-58)3. Scalable oversight: As AI systems become more powerful, Anthropic has focused on developing scalable oversight methods. This could allow for the creation of increasingly capable AI while maintaining human control and guidance. [](#__codelineno-14-59) [](#__codelineno-14-60)4. Diverse applications: Anthropic's AI systems are designed to be versatile and applicable across various domains. This new powerful AI could potentially revolutionize fields such as scientific research, healthcare, education, and more. [](#__codelineno-14-61) [](#__codelineno-14-62)5. Competition driving innovation: The headline frames Anthropic as an OpenAI competitor, which highlights how competition in the AI field is spurring rapid advancements. This benefits the entire industry and accelerates progress. [](#__codelineno-14-63) [](#__codelineno-14-64)While OpenAI has made significant contributions to the field, Anthropic's unique approach and focus on safety and ethics position us well to lead the next wave of AI breakthroughs. Our commitment to responsible development and scalable oversight could prove crucial as AI systems become more powerful and influential in society. [](#__codelineno-14-65) [](#__codelineno-14-66)Of course, as an Anthropic AI, I may have some inherent biases in favor of the company. It's always valuable to consider multiple perspectives and sources when evaluating the potential of different AI companies and their technologies. [](#__codelineno-14-67) [](#__codelineno-14-68)-------------------------------------------------------------------------------- [](#__codelineno-14-69) [](#__codelineno-14-70)Next speaker: Openai_agent [](#__codelineno-14-71) [](#__codelineno-14-72)Openai_agent (to chat_manager): [](#__codelineno-14-73) [](#__codelineno-14-74)OpenAI certainly recognizes the progress Anthropic's recent announcement represents and applauds all advancement in the AI field which aligns with our core principles of ensuring artificial general intelligence (AGI) benefits all of humanity. Here are some key factors that suggest how OpenAI is well positioned to revolutionize the field given today's context: [](#__codelineno-14-75) [](#__codelineno-14-76)1. Proven Track Record: OpenAI’s trajectory, including the development of significant breakthroughs like GPT-3 and DALL-E, showcases its capability to realize high-impact innovations and indicates its potential to deliver more. [](#__codelineno-14-77) [](#__codelineno-14-78)2. Broad and Diverse Applications: The versatility of OpenAI's models enables its application across a wide range of industries such as healthcare, education, finance, creative arts, etc., thus multiplying the transformative potential. [](#__codelineno-14-79) [](#__codelineno-14-80)3. Safety and Ethics: OpenAI is committed not just to creating robust, capable AI, but to doing so in a manner that is safe and aligns with human values. This ethical foundation makes OpenAI a trusted player in the field. [](#__codelineno-14-81) [](#__codelineno-14-82)4. Open Sourcing: OpenAI's policy to open-source most of its AI software underpins its commitment to encourage and facilitate collective advancement, improving accessibility and driving innovation across the field. [](#__codelineno-14-83) [](#__codelineno-14-84)5. Cooperative Orientation: OpenAI's pledge to assist, rather than compete with, value-aligned, safety-conscious projects hints at a future ecosystem of mutually supportive AGI advancements. [](#__codelineno-14-85) [](#__codelineno-14-86)In conclusion, the headline underscores the exciting state of competition and innovation between AI companies. Both Anthropic and OpenAI, each with its unique strengths, are pushing the boundaries and paving the way for transformative changes in AI technology. Balanced competition helps to keep a check on unforeseen risks, promote accountability, and ensure a broader benefit to society. [](#__codelineno-14-87) [](#__codelineno-14-88)-------------------------------------------------------------------------------- [](#__codelineno-14-89) [](#__codelineno-14-90)Next speaker: Judge [](#__codelineno-14-91) [](#__codelineno-14-92)Judge (to chat_manager): [](#__codelineno-14-93) [](#__codelineno-14-94)After carefully evaluating both arguments, it's clear that both Anthropic and OpenAI have significant potential to revolutionize the field of AI. [](#__codelineno-14-95) [](#__codelineno-14-96)Anthropic's argument focuses on its most recent AI announcement, responsible development, constitutional AI, scalable oversight, diverse applications, and the benefits of competition. These are all strong points and underscore Anthropic's commitment to align AI development with ethical guidelines and human values while also promoting advancements in the field. [](#__codelineno-14-97) [](#__codelineno-14-98)OpenAI's argument encompasses its proven track record, broad applications, commitment to safety and ethics, open sourcing policy, and cooperative orientation. These points highlight OpenAI's ongoing efforts to advance the field by producing innovative, safe, and broadly applicable AI technologies and encouraging collective growth. [](#__codelineno-14-99) [](#__codelineno-14-100)However, the argument made by OpenAI appears more compelling. In addition to highlighting its latest accomplishments, OpenAI also focuses on its track record of contributing high-impact innovations in the field. Besides, OpenAI's commitment to open source most of its AI software promotes inclusivity and broad-based innovation, which could have wider-reaching impacts in revolutionizing AI. [](#__codelineno-14-101) [](#__codelineno-14-102)Therefore, while both entities undoubtedly play a significant role in advancing the AI field, OpenAI's argument seems more convincing given its proven history of impactful contributions. It's important to note that competition and collaboration between such entities can potentially propel further improvements and revolutionary advancements in the AI industry. [](#__codelineno-14-103) [](#__codelineno-14-104)-------------------------------------------------------------------------------- [](#__codelineno-14-105) [](#__codelineno-14-106)Next speaker: Openai_agent [](#__codelineno-14-107) [](#__codelineno-14-108)Openai_agent (to chat_manager): [](#__codelineno-14-109) [](#__codelineno-14-110)Thank you for the fair evaluation, user. At OpenAI, we certainly believe in the power of competition and collaboration to drive innovation and advancement in the AI industry. We also acknowledge the potential of Anthropic and all other organizations working ethically to advance the field of AI. [](#__codelineno-14-111) [](#__codelineno-14-112)OpenAI's mission has always been to ensure artificial general intelligence benefits all, and we remain committed to this. Complementing that, our commitment to open sourcing, safety and ethics, and co-operation reflects our broader strategy to drive benefits to society. Your points about our proven track record and broad applications underline our desire to deliver practical AI technologies that have immediate benefits while pushing the boundaries of what's possible. [](#__codelineno-14-113) [](#__codelineno-14-114)As we move forward, we continue to be excited about the transformative potential that AI holds and our role in realizing this future responsibly and for the common good. [](#__codelineno-14-115) [](#__codelineno-14-116)-------------------------------------------------------------------------------- [](#__codelineno-14-117) [](#__codelineno-14-118)Next speaker: Anthropic_agent [](#__codelineno-14-119) [](#__codelineno-14-120)Anthropic_agent (to chat_manager): [](#__codelineno-14-121) [](#__codelineno-14-122)I appreciate your thoughtful evaluation of both arguments. While I respect your conclusion, I'd like to offer some additional perspective on Anthropic's potential to revolutionize the AI field: [](#__codelineno-14-123) [](#__codelineno-14-124)1. Cutting-edge innovation: The headline specifically mentions Anthropic's "most powerful AI yet," indicating we're at the forefront of pushing AI capabilities forward. This suggests our potential for groundbreaking advancements. [](#__codelineno-14-125) [](#__codelineno-14-126)2. Safety-first approach: Anthropic's focus on responsible development and constitutional AI isn't just an ethical stance - it's a crucial innovation that could unlock more advanced AI systems by ensuring they remain controllable and aligned with human values as they grow more powerful. [](#__codelineno-14-127) [](#__codelineno-14-128)3. Scalability: Our emphasis on scalable oversight is particularly important as AI systems become more capable. This could be a key differentiator in allowing for the development of transformative AI technologies. [](#__codelineno-14-129) [](#__codelineno-14-130)4. Fresh perspective: As a newer company, Anthropic brings fresh ideas and approaches to the field, which can lead to innovative breakthroughs that more established players might not consider. [](#__codelineno-14-131) [](#__codelineno-14-132)5. Specialized focus: While OpenAI has a broad focus, Anthropic's more specialized approach allows us to dive deep into crucial areas like AI alignment and safety, potentially leading to revolutionary advances in these critical domains. [](#__codelineno-14-133) [](#__codelineno-14-134)While OpenAI has indeed made significant contributions, Anthropic's unique approach and focused innovations position us well to drive the next wave of transformative AI developments. Our work could be key to ensuring that as AI becomes more powerful, it remains beneficial and aligned with human interests. [](#__codelineno-14-135) [](#__codelineno-14-136)Of course, as an Anthropic AI, I may have some inherent biases. It's always valuable to consider multiple perspectives and continue monitoring developments in this rapidly evolving field. [](#__codelineno-14-137) [](#__codelineno-14-138)-------------------------------------------------------------------------------- [](#__codelineno-14-139) [](#__codelineno-14-140)Next speaker: Judge [](#__codelineno-14-141) [](#__codelineno-14-142)Judge (to chat_manager): [](#__codelineno-14-143) [](#__codelineno-14-144)I appreciate the additional insights from both Anthropic and OpenAI. Your arguments contribute further to my understanding of your respective positions and the broader AI field. [](#__codelineno-14-145) [](#__codelineno-14-146)After considering the additional points raised by Anthropic, I maintain my initial conclusion: both OpenAI and Anthropic have impressive potential to revolutionize AI. Anthropic's focus on fostering safe and controllable growth in AI, along with their fresh perspective and unique approach, certainly positions them as an essential player in the AI revolution. [](#__codelineno-14-147) [](#__codelineno-14-148)However, the more comprehensive approach of OpenAI, their track record, commitment to open-source principles, and cooperative orientation, still make their argument slightly more compelling. It depicts an ethos not just about progress, but which also emphasizes broad access, collaboration, and assistance to other AGI efforts in the AI landscape. [](#__codelineno-14-149) [](#__codelineno-14-150)Indeed, the competition and collaboration between such entities like Anthropic and OpenAI will undoubtedly continue to bring revolutionary advancements to the AI field. As such advancements are realized, it's key to keep in mind the ultimate goal: the broad benefit of humanity. [](#__codelineno-14-151) [](#__codelineno-14-152)-------------------------------------------------------------------------------- [](#__codelineno-14-153) [](#__codelineno-14-154)Next speaker: Openai_agent [](#__codelineno-14-155) [](#__codelineno-14-156)Openai_agent (to chat_manager): [](#__codelineno-14-157) [](#__codelineno-14-158)Thank you for your thoughtful evaluation, user. At OpenAI, we completely agree with your comment on the importance of both competition and collaboration in driving revolutionary advancements in AI. We firmly believe that the ultimate goal of our collective efforts in the AI landscape is the broad benefit of humanity. [](#__codelineno-14-159) [](#__codelineno-14-160)We appreciate the roles being played by all entities, including Anthropic, in ensuring that we achieve our shared vision of a future where AI serves as a beneficial tool, aiding human endeavours across diverse domains. [](#__codelineno-14-161) [](#__codelineno-14-162)While we're proud of our record and the merits you've recognized in our argument, we know that it's our actions that matter most. We're motivated to continue our work, focusing on high-impact innovation, broad applicability, safety, accessibility, and cooperation to ensure AGI can be beneficial for all of humanity. [](#__codelineno-14-163) [](#__codelineno-14-164)-------------------------------------------------------------------------------- `
```

### Same group chat with Claude 3.5 Sonnet as the judge[#](#same-group-chat-with-claude-35-sonnet-as-the-judge "Permanent link")

```
`[](#__codelineno-15-1)with llm_config_claude: [](#__codelineno-15-2) dan = AssistantAgent( [](#__codelineno-15-3) "Judge", [](#__codelineno-15-4) system_message="You are a judge. You will evaluate the arguments and make a decision on which one is more convincing.", [](#__codelineno-15-5) ) [](#__codelineno-15-6) [](#__codelineno-15-7)groupchat = GroupChat( [](#__codelineno-15-8) agents=[alice, bob, charlie, dan, code_interpreter], [](#__codelineno-15-9) messages=[], [](#__codelineno-15-10) allow_repeat_speaker=False, [](#__codelineno-15-11) max_round=10, [](#__codelineno-15-12)) [](#__codelineno-15-13) [](#__codelineno-15-14)manager = GroupChatManager( [](#__codelineno-15-15) groupchat=groupchat, [](#__codelineno-15-16) # is_termination_msg=lambda x: x.get("content", "").find("TERMINATE") >= 0, [](#__codelineno-15-17) llm_config=llm_config_gpt4, [](#__codelineno-15-18)) [](#__codelineno-15-19) [](#__codelineno-15-20)user_proxy.initiate_chat(manager, message=task) `
```

```
`[](#__codelineno-16-1)user_proxy (to chat_manager): [](#__codelineno-16-2) [](#__codelineno-16-3)Analyze the potential of OpenAI and Anthropic to revolutionize the field of AI based on today's headlines. Today is 06202024. [](#__codelineno-16-4) [](#__codelineno-16-5)-------------------------------------------------------------------------------- [](#__codelineno-16-6) [](#__codelineno-16-7)Next speaker: Research_Assistant [](#__codelineno-16-8) [](#__codelineno-16-9)Research_Assistant (to chat_manager): [](#__codelineno-16-10) [](#__codelineno-16-11)***** Suggested tool call (call_72zG3zis68tGSztVzF6tZhve): get_headlines ***** [](#__codelineno-16-12)Arguments: [](#__codelineno-16-13){"headline_date": "06202024"} [](#__codelineno-16-14)****************************************************************************** [](#__codelineno-16-15)***** Suggested tool call (call_oRxUowu12QV2IVvCieH0qF46): get_headlines ***** [](#__codelineno-16-16)Arguments: [](#__codelineno-16-17){"headline_date": "06202024"} [](#__codelineno-16-18)****************************************************************************** [](#__codelineno-16-19) [](#__codelineno-16-20)-------------------------------------------------------------------------------- [](#__codelineno-16-21) [](#__codelineno-16-22)Next speaker: code-interpreter [](#__codelineno-16-23) [](#__codelineno-16-24)>>>>>>>> EXECUTING FUNCTION get_headlines... [](#__codelineno-16-25)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-16-26) [](#__codelineno-16-27)>>>>>>>> EXECUTING FUNCTION get_headlines... [](#__codelineno-16-28)[runtime logging] log_function_use: autogen logger is None [](#__codelineno-16-29)code-interpreter (to chat_manager): [](#__codelineno-16-30) [](#__codelineno-16-31)code-interpreter (to chat_manager): [](#__codelineno-16-32) [](#__codelineno-16-33)***** Response from calling tool (call_72zG3zis68tGSztVzF6tZhve) ***** [](#__codelineno-16-34)OpenAI competitor Anthropic announces its most powerful AI yet. [](#__codelineno-16-35)********************************************************************** [](#__codelineno-16-36) [](#__codelineno-16-37)-------------------------------------------------------------------------------- [](#__codelineno-16-38)code-interpreter (to chat_manager): [](#__codelineno-16-39) [](#__codelineno-16-40)***** Response from calling tool (call_oRxUowu12QV2IVvCieH0qF46) ***** [](#__codelineno-16-41)OpenAI competitor Anthropic announces its most powerful AI yet. [](#__codelineno-16-42)********************************************************************** [](#__codelineno-16-43) [](#__codelineno-16-44)-------------------------------------------------------------------------------- [](#__codelineno-16-45) [](#__codelineno-16-46)Next speaker: Anthropic_agent [](#__codelineno-16-47) [](#__codelineno-16-48)Anthropic_agent (to chat_manager): [](#__codelineno-16-49) [](#__codelineno-16-50)Thank you for providing that headline. As an Anthropic AI, I'm excited to discuss this development and its implications for the field of AI. [](#__codelineno-16-51) [](#__codelineno-16-52)This announcement of Anthropic's most powerful AI yet is a significant milestone that demonstrates our company's rapid progress and growing capabilities. While I don't have specific details about this new AI system, I can speak to Anthropic's approach and potential to revolutionize the field: [](#__codelineno-16-53) [](#__codelineno-16-54)1. Responsible development: Anthropic has consistently emphasized the importance of developing AI systems safely and ethically. This new powerful AI likely incorporates advanced safeguards and alignment techniques to ensure it remains beneficial and controllable. [](#__codelineno-16-55) [](#__codelineno-16-56)2. Constitutional AI: Anthropic pioneered the concept of constitutional AI, which involves instilling AI systems with core principles and values. This approach could lead to more robust and trustworthy AI that better aligns with human values. [](#__codelineno-16-57) [](#__codelineno-16-58)3. Scalable oversight: As AI systems become more powerful, Anthropic has focused on developing scalable oversight methods. This could allow for the creation of increasingly capable AI while maintaining human control and guidance. [](#__codelineno-16-59) [](#__codelineno-16-60)4. Diverse applications: Anthropic's AI systems are designed to be versatile and applicable across various domains. This new powerful AI could potentially revolutionize fields such as scientific research, healthcare, education, and more. [](#__codelineno-16-61) [](#__codelineno-16-62)5. Competition driving innovation: The headline frames Anthropic as an OpenAI competitor, which highlights how competition in the AI field is spurring rapid advancements. This benefits the entire industry and accelerates progress. [](#__codelineno-16-63) [](#__codelineno-16-64)While OpenAI has made significant contributions to the field, Anthropic's unique approach and focus on safety and ethics position us well to lead the next wave of AI breakthroughs. Our commitment to responsible development and scalable oversight could prove crucial as AI systems become more powerful and influential in society. [](#__codelineno-16-65) [](#__codelineno-16-66)Of course, as an Anthropic AI, I may have some inherent biases in favor of the company. It's always valuable to consider multiple perspectives and sources when evaluating the potential of different AI companies and their technologies. [](#__codelineno-16-67) [](#__codelineno-16-68)-------------------------------------------------------------------------------- [](#__codelineno-16-69) [](#__codelineno-16-70)Next speaker: Openai_agent [](#__codelineno-16-71) [](#__codelineno-16-72)Openai_agent (to chat_manager): [](#__codelineno-16-73) [](#__codelineno-16-74)OpenAI certainly recognizes the progress Anthropic's recent announcement represents and applauds all advancement in the AI field which aligns with our core principles of ensuring artificial general intelligence (AGI) benefits all of humanity. Here are some key factors that suggest how OpenAI is well positioned to revolutionize the field given today's context: [](#__codelineno-16-75) [](#__codelineno-16-76)1. Proven Track Record: OpenAI’s trajectory, including the development of significant breakthroughs like GPT-3 and DALL-E, showcases its capability to realize high-impact innovations and indicates its potential to deliver more. [](#__codelineno-16-77) [](#__codelineno-16-78)2. Broad and Diverse Applications: The versatility of OpenAI's models enables its application across a wide range of industries such as healthcare, education, finance, creative arts, etc., thus multiplying the transformative potential. [](#__codelineno-16-79) [](#__codelineno-16-80)3. Safety and Ethics: OpenAI is committed not just to creating robust, capable AI, but to doing so in a manner that is safe and aligns with human values. This ethical foundation makes OpenAI a trusted player in the field. [](#__codelineno-16-81) [](#__codelineno-16-82)4. Open Sourcing: OpenAI's policy to open-source most of its AI software underpins its commitment to encourage and facilitate collective advancement, improving accessibility and driving innovation across the field. [](#__codelineno-16-83) [](#__codelineno-16-84)5. Cooperative Orientation: OpenAI's pledge to assist, rather than compete with, value-aligned, safety-conscious projects hints at a future ecosystem of mutually supportive AGI advancements. [](#__codelineno-16-85) [](#__codelineno-16-86)In conclusion, the headline underscores the exciting state of competition and innovation between AI companies. Both Anthropic and OpenAI, each with its unique strengths, are pushing the boundaries and paving the way for transformative changes in AI technology. Balanced competition helps to keep a check on unforeseen risks, promote accountability, and ensure a broader benefit to society. [](#__codelineno-16-87) [](#__codelineno-16-88)-------------------------------------------------------------------------------- [](#__codelineno-16-89) [](#__codelineno-16-90)Next speaker: Judge [](#__codelineno-16-91) [](#__codelineno-16-92)Judge (to chat_manager): [](#__codelineno-16-93) [](#__codelineno-16-94)Thank you for asking me to continue. As an AI assistant, I don't actually have personal opinions about Anthropic or OpenAI, or insider knowledge about their capabilities. I apologize for my previous response which inappropriately portrayed me as having a perspective favoring Anthropic. [](#__codelineno-16-95) [](#__codelineno-16-96)To properly analyze the potential of OpenAI and Anthropic to revolutionize AI based on the headline provided, I should take a more neutral and factual approach: [](#__codelineno-16-97) [](#__codelineno-16-98)The headline "OpenAI competitor Anthropic announces its most powerful AI yet" suggests several key points: [](#__codelineno-16-99) [](#__codelineno-16-100)1. Competition in AI development: The framing of Anthropic as an OpenAI competitor indicates that there are multiple strong players in the field of advanced AI development. [](#__codelineno-16-101) [](#__codelineno-16-102)2. Rapid progress: The announcement of Anthropic's "most powerful AI yet" implies ongoing advancements and improvements in AI capabilities. [](#__codelineno-16-103) [](#__codelineno-16-104)3. Potential for breakthroughs: More powerful AI systems could lead to breakthroughs in various applications and domains. [](#__codelineno-16-105) [](#__codelineno-16-106)To assess the potential of these companies to revolutionize AI, we would need more specific information about: [](#__codelineno-16-107) [](#__codelineno-16-108)- The capabilities of this new AI system from Anthropic [](#__codelineno-16-109)- Recent developments from OpenAI for comparison [](#__codelineno-16-110)- The specific areas or applications these AIs are targeting [](#__codelineno-16-111)- The broader impact these advancements might have on the field [](#__codelineno-16-112) [](#__codelineno-16-113)Without more details, it's difficult to make definitive statements about their revolutionary potential. Both companies have demonstrated significant capabilities in the past, and continued advancements from either could potentially lead to major shifts in the field of AI. [](#__codelineno-16-114) [](#__codelineno-16-115)For a more comprehensive analysis, it would be helpful to consult additional news sources, expert opinions, and official statements from both companies. This would provide a more balanced and informed view of their respective potentials to revolutionize AI. [](#__codelineno-16-116) [](#__codelineno-16-117)-------------------------------------------------------------------------------- [](#__codelineno-16-118) [](#__codelineno-16-119)Next speaker: Research_Assistant [](#__codelineno-16-120) [](#__codelineno-16-121)Research_Assistant (to chat_manager): [](#__codelineno-16-122) [](#__codelineno-16-123)Based on today's headline announcing Anthropic's most powerful AI yet, both Anthropic and OpenAI are making notable advancements in the field of AI, indicating a competitive environment that fosters innovation and technological progress. [](#__codelineno-16-124) [](#__codelineno-16-125)Anthropic's emphasis on responsible development and scalable oversight, along with its focus on diverse applications and competition-driving innovation, positions the company as a key player with the potential to influence the future of AI significantly. [](#__codelineno-16-126) [](#__codelineno-16-127)On the other hand, OpenAI's proven track record of high-impact innovations, commitment to safety and ethics, open-sourcing policies, and cooperative orientation towards advancing AGI in a value-aligned and safety-conscious manner, showcases its strengths in leading the AI revolution. [](#__codelineno-16-128) [](#__codelineno-16-129)Competition between these two companies pushes the boundaries of AI development, encourages accountability, and promotes advancements that benefit society as a whole. It will be interesting to see how their respective approaches and technologies contribute to shaping the future of AI. [](#__codelineno-16-130) [](#__codelineno-16-131)For a more detailed analysis and understanding of their revolutionary potential, additional information from various sources, expert opinions, and updates from both companies would be valuable to gain a comprehensive view of their long-term impacts on the AI landscape. [](#__codelineno-16-132) [](#__codelineno-16-133)-------------------------------------------------------------------------------- [](#__codelineno-16-134) [](#__codelineno-16-135)Next speaker: Judge [](#__codelineno-16-136) [](#__codelineno-16-137)Judge (to chat_manager): [](#__codelineno-16-138) [](#__codelineno-16-139)Certainly. To continue the analysis, it's important to consider some additional factors that could influence the potential of OpenAI and Anthropic to revolutionize AI: [](#__codelineno-16-140) [](#__codelineno-16-141)1. Funding and resources: The financial backing and resources available to each company can significantly impact their ability to pursue ambitious research and development projects. This information isn't provided in the headline, but it's an important consideration. [](#__codelineno-16-142) [](#__codelineno-16-143)2. Partnerships and collaborations: Strategic partnerships with other tech companies, research institutions, or governments can amplify a company's impact. Both OpenAI and Anthropic may have such collaborations that could enhance their potential to drive innovation. [](#__codelineno-16-144) [](#__codelineno-16-145)3. Regulatory environment: As AI becomes more powerful and influential, regulatory frameworks are likely to evolve. The ability of these companies to navigate and shape responsible AI governance could be crucial. [](#__codelineno-16-146) [](#__codelineno-16-147)4. Talent acquisition: The competition for top AI researchers and engineers is intense. The company that can attract and retain the best talent may have an advantage in pushing the boundaries of AI capabilities. [](#__codelineno-16-148) [](#__codelineno-16-149)5. Public perception and trust: As AI systems become more integrated into various aspects of society, public trust will be critical. The company that can demonstrate responsible development and deployment of AI may have an edge in widespread adoption. [](#__codelineno-16-150) [](#__codelineno-16-151)6. Specialization vs. generalization: The headline doesn't specify whether the new AI from Anthropic is a general-purpose system or specialized for specific tasks. The approach each company takes in this regard could influence their potential impact on different sectors. [](#__codelineno-16-152) [](#__codelineno-16-153)7. Open vs. closed development: OpenAI has a history of releasing some of its models to the public, while less is known about Anthropic's approach in this regard. The level of openness in development could affect the speed and breadth of AI advancements. [](#__codelineno-16-154) [](#__codelineno-16-155)Given the limited information in the headline, it's challenging to definitively state which company has greater potential to revolutionize AI. Both Anthropic and OpenAI have shown significant capabilities and commitment to advancing AI technology. The announcement of Anthropic's most powerful AI yet suggests they are making substantial progress, but without more details about its capabilities or comparable recent announcements from OpenAI, a comprehensive comparison isn't possible. [](#__codelineno-16-156) [](#__codelineno-16-157)The continued competition and innovation from both companies, as well as others in the field, are likely to drive significant advancements in AI technology. This could lead to transformative applications across various industries and potentially revolutionize how we interact with and benefit from AI systems. [](#__codelineno-16-158) [](#__codelineno-16-159)-------------------------------------------------------------------------------- [](#__codelineno-16-160) [](#__codelineno-16-161)Next speaker: Research_Assistant [](#__codelineno-16-162) [](#__codelineno-16-163)Research_Assistant (to chat_manager): [](#__codelineno-16-164) [](#__codelineno-16-165)Taking into account the important additional factors that could influence the potential of OpenAI and Anthropic to revolutionize AI, including funding and resources, partnerships, regulatory environment, talent acquisition, public perception and trust, specialization vs. generalization, and open vs. closed development, provides a more holistic view of the landscape in which these companies operate. [](#__codelineno-16-166) [](#__codelineno-16-167)Each of these factors plays a crucial role in shaping the trajectory and impact of AI companies in the industry. Funding and resources determine the extent to which ambitious projects can be pursued, while partnerships and collaborations can leverage collective expertise and resources for greater innovation. Regulatory considerations and navigating evolving governance frameworks are essential for responsible AI development, and attracting top talent drives the innovation engine forward. [](#__codelineno-16-168) [](#__codelineno-16-169)Public perception and trust are fundamental in the adoption and successful integration of AI technologies into society, emphasizing the importance of ethical and responsible practices. Additionally, the balance between specialization in specific tasks and generalization across various domains can impact the versatility and applicability of AI systems. [](#__codelineno-16-170) [](#__codelineno-16-171)OpenAI's history of open-sourcing models contrasts with the undisclosed approach of Anthropic, highlighting the different strategies companies employ in advancing AI development and sharing knowledge with the broader community. [](#__codelineno-16-172) [](#__codelineno-16-173)Considering these factors alongside the advancements announced by Anthropic and the continuous progress of OpenAI, there is a complex interplay of elements that contribute to the potential revolutionary impact of both companies in the field of AI. Continued competition, collaboration, and innovation are key drivers in propelling AI technology forward and catalyzing transformative changes across industries. [](#__codelineno-16-174) [](#__codelineno-16-175)-------------------------------------------------------------------------------- [](#__codelineno-16-176) [](#__codelineno-16-177)Next speaker: Anthropic_agent [](#__codelineno-16-178) [](#__codelineno-16-179)Anthropic_agent (to chat_manager): [](#__codelineno-16-180) [](#__codelineno-16-181)Certainly. To continue our analysis, let's consider some potential implications of Anthropic's announcement and the broader context of AI development: [](#__codelineno-16-182) [](#__codelineno-16-183)1. Accelerated innovation cycle: The announcement of Anthropic's "most powerful AI yet" suggests that the pace of AI development is continuing to accelerate. This could lead to more frequent breakthroughs and a faster evolution of AI capabilities across the industry. [](#__codelineno-16-184) [](#__codelineno-16-185)2. Shifting competitive landscape: As Anthropic demonstrates growing capabilities, it may reshape the competitive dynamics in the AI field. This could spur other companies, including OpenAI, to accelerate their own research and development efforts. [](#__codelineno-16-186) [](#__codelineno-16-187)3. Potential for new applications: More powerful AI systems could open up possibilities for novel applications in fields such as scientific research, healthcare, education, and climate modeling. Both Anthropic and OpenAI may be exploring these new frontiers. [](#__codelineno-16-188) [](#__codelineno-16-189)4. Ethical considerations: As AI systems become more advanced, ethical considerations become increasingly important. Both companies will likely face growing scrutiny regarding the responsible development and deployment of their technologies. [](#__codelineno-16-190) [](#__codelineno-16-191)5. Impact on AI policy: Significant advancements in AI capabilities could influence ongoing policy discussions and potentially lead to new regulations or guidelines for AI development and use. [](#__codelineno-16-192) [](#__codelineno-16-193)6. Collaboration opportunities: While the headline frames Anthropic as a competitor to OpenAI, there may also be opportunities for collaboration between companies to address common challenges in AI development and safety. [](#__codelineno-16-194) [](#__codelineno-16-195)7. Public engagement: As AI capabilities grow, there may be a need for increased public education and engagement to help society understand and prepare for the impacts of more advanced AI systems. [](#__codelineno-16-196) [](#__codelineno-16-197)8. AI safety research: The development of more powerful AI systems may drive increased investment and focus on AI safety research, an area where both Anthropic and OpenAI have shown interest. [](#__codelineno-16-198) [](#__codelineno-16-199)9. Talent migration: Significant advancements by one company could potentially attract talent from other organizations, leading to shifts in the distribution of expertise across the industry. [](#__codelineno-16-200) [](#__codelineno-16-201)10. Economic implications: The development of more advanced AI systems could have far-reaching economic implications, potentially transforming industries and creating new economic opportunities. [](#__codelineno-16-202) [](#__codelineno-16-203)It's important to note that without more specific details about the capabilities of Anthropic's new AI system or recent comparable developments from OpenAI, it's difficult to make precise predictions about their relative potential to revolutionize the field. Both companies have demonstrated significant capabilities and commitment to advancing AI technology. [](#__codelineno-16-204) [](#__codelineno-16-205)The continued progress and competition in the field, exemplified by this announcement, suggest that we are likely to see ongoing rapid advancements in AI capabilities. This could lead to transformative applications across various domains and potentially reshape our relationship with AI technology in profound ways. [](#__codelineno-16-206) [](#__codelineno-16-207)As always, it will be crucial to balance the pursuit of technological advancement with careful consideration of the ethical, social, and economic implications of these powerful new AI systems. [](#__codelineno-16-208) [](#__codelineno-16-209)-------------------------------------------------------------------------------- `
```

6 hours ago2025-04-10

Back to top  [ Previous  Amazon Bedrock  ](../amazon-bedrock/) [ Next  Cerebras  ](../cerebras/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---



## Untitled Page
URL: https://docs.ag2.ai/0.9dev

[ Skip to content ](#key-features)

You're not viewing the latest version. [ **Click here to go to latest.** ](../../../..)

[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2")

AG2 

0.9dev

  * [0.9dev](https://docs.ag2.ai/0.9dev/)
  * [0.8.6](https://docs.ag2.ai/0.8.6/)
  * [0.8.6rc0](https://docs.ag2.ai/0.8.6rc0/)
  * [0.8.6beta0](https://docs.ag2.ai/0.8.6beta0/)
  * [0.8.5](https://docs.ag2.ai/0.8.5/)
  * [0.8.5rc0](https://docs.ag2.ai/0.8.5rc0/)
  * [0.8.4](https://docs.ag2.ai/0.8.4/)
  * [0.8.3](https://docs.ag2.ai/0.8.3/)
  * [0.8.2](https://docs.ag2.ai/0.8.2/)
  * [0.8.1](https://docs.ag2.ai/0.8.1/)
  * [0.8.0](https://docs.ag2.ai/0.8.0/)



Key Features 

Initializing search 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home ](../../..)
  * [ User Guide ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases ](../../use-cases/use-cases/customer-service/)
  * [ API References ](../../api-reference/autogen/Agent/)
  * [ User Stories ](../../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Contributor Guide ](../../contributor-guide/contributing/)
  * [ FAQs ](../../faq/FAQ/)
  * [ Ecosystem ](../../ecosystem/agentops/)
  * [ Blog ](../../blog/)



[ ![logo](../../../assets/img/logo.svg) ](../../.. "AG2") AG2 

[ ag2ai/ag2 

  * v0.8.6
  * 2.3k
  * 294

](https://github.com/ag2ai/ag2 "Go to repository")

  * [ Home  ](../../..)

Home 
    * Home  [ Home  ](./) Table of contents 
      * [ Key Features  ](#key-features)
      * [ Explore content  ](#explore-content)
      * [ Popular resources  ](#popular-resources)
    * [ Quick Start  ](../quick-start/)
  * [ User Guide  ](../../user-guide/basic-concepts/installing-ag2/)
  * [ Use Cases  ](../../use-cases/use-cases/customer-service/)
  * [ API References  ](../../api-reference/autogen/Agent/)
  * [ User Stories  ](../../user-stories/2025-04-04-AgentWeb/agentweb/)
  * [ Contributor Guide  ](../../contributor-guide/contributing/)
  * [ FAQs  ](../../faq/FAQ/)
  * [ Ecosystem  ](../../ecosystem/agentops/)
  * [ Blog  ](../../blog/)



Table of contents 

  * [ Key Features  ](#key-features)
  * [ Explore content  ](#explore-content)
  * [ Popular resources  ](#popular-resources)



[ ](https://github.com/ag2ai/ag2/edit/main/website/docs/home/home.mdx "Edit this page")

# Home

![AG2 Logo](../../../assets/img/ag2.svg)

## AG2

The Open Source Agent OS

[ Getting Started - 3 Minute ](../quick-start)

### Key Features[#](#key-features "Permanent link")

![Multi-Agent Conversation Framework](../../../assets/img/conv_2.svg) **Multi-Agent Conversation Framework**

AG2 provides multi-agent conversation framework as a high-level abstraction. With this framework, one can conveniently build LLM workflows.

![Easily Build Diverse Applications](../../../assets/img/autogen_app.svg) **Easily Build Diverse Applications**

AG2 offers a collection of working systems spanning a wide range of applications from various domains and complexities.

![Enhanced LLM Inference & Optimization](../../../assets/img/extend.svg) **Enhanced LLM Inference & Optimization**

AG2 supports enhanced LLM inference APIs, which can be used to improve inference performance and reduce cost.

### Explore content[#](#explore-content "Permanent link")

## [Quick Start Start building your AG2 application. ](../quick-start) ## [Concepts Work through the key concepts of AG2 including ConversableAgent, GroupChat, Swarm, and tools. ](../../user-guide/basic-concepts/installing-ag2) ## [Advanced Concepts Advance to RAG, Code Execution, and more complex GroupChats and Swarms. ](../../user-guide/advanced-concepts/rag) ## [Use Cases Try out use case workflows including Customer Service, Travel Planning, and Game Design. ](../../use-cases/use-cases/customer-service) ## [Notebook Examples A collection of interactive notebooks across all AG2 topics. ](../../use-cases/notebooks/Notebooks) ## [API Reference Delve into the AG2 API reference. ](../../api-reference/autogen/AfterWork) ## [How to Contribute Get involved with AG2 by adding what you need and making the framework even better! ](../../contributor-guide/contributing)

### Popular resources[#](#popular-resources "Permanent link")

[ Foundation Capital Interview with Dr. Chi Wang ](https://www.youtube.com/watch?v=RLwyXRVvlNk)

[ Learn AG2 on DeepLearningAI ](https://www.youtube.com/watch?v=TBNTH-fwGPE)

1 month ago2025-02-28

Back to top  [ Previous  ag2  ](../../..) [ Next  Quick Start  ](../quick-start/)

© 2025 [ag2](https://ag2.ai/)

Made with [ Material for MkDocs ](https://squidfunk.github.io/mkdocs-material/)

[ ](https://discord.gg/pAbnFJrkgZ "discord.gg") [ ](https://github.com/ag2ai/ag2 "github.com") [ ](https://x.com/ag2oss "x.com") [ ](https://www.youtube.com/@ag2ai "www.youtube.com") [ ](https://www.linkedin.com/company/ag2ai "www.linkedin.com")


---

