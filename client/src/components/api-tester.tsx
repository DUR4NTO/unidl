import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Play, Copy, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { DownloadResponse } from "@shared/schema";

export function ApiTester() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState<string>("");
  const { toast } = useToast();

  const testApiMutation = useMutation({
    mutationFn: async (testUrl: string): Promise<DownloadResponse> => {
      const response = await fetch(`/api/download?url=${encodeURIComponent(testUrl)}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: (data) => {
      setResponse(JSON.stringify(data, null, 2));
      toast({
        title: "API Test Successful",
        description: "Check the response below",
      });
    },
    onError: (error) => {
      const errorResponse = {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Unknown error",
          details: "Failed to make API request"
        }
      };
      setResponse(JSON.stringify(errorResponse, null, 2));
      toast({
        title: "API Test Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  const generateCurlCommand = () => {
    if (!url) return "";
    return `curl -X GET "${window.location.origin}/api/download?url=${encodeURIComponent(url)}"`;
  };

  const copyCurl = () => {
    const curlCommand = generateCurlCommand();
    if (curlCommand) {
      navigator.clipboard.writeText(curlCommand);
      toast({
        title: "Copied!",
        description: "cURL command copied to clipboard",
      });
    }
  };

  const testApi = () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to test",
        variant: "destructive",
      });
      return;
    }
    testApiMutation.mutate(url);
  };

  return (
    <Card className="bg-secondary rounded-lg p-4">
      <h4 className="font-semibold mb-3" data-testid="text-api-tester-title">Try it now</h4>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1" data-testid="label-url">URL</label>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.tiktok.com/@username/video/1234567890"
            className="w-full bg-input border border-border"
            data-testid="input-test-url"
          />
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={testApi}
            disabled={testApiMutation.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-test-api"
          >
            {testApiMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {testApiMutation.isPending ? "Testing..." : "Test API"}
          </Button>
          <Button 
            onClick={copyCurl}
            variant="secondary"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            data-testid="button-copy-curl"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy cURL
          </Button>
        </div>
        {response && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1" data-testid="label-response">Response</label>
            <div className="code-block rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-muted-foreground text-xs font-mono" data-testid="response-output">
                {response}
              </pre>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
