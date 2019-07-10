#!/usr/bin/env ruby

require 'erubis'
require 'fileutils'
require 'socket'


Erdos = '10.0.1.3'
Local_Network = /^10\./

def main(opts)
  script_dir = File.expand_path(__dir__)
  root_dir = script_dir

  Dir.chdir(script_dir)

  my_ip_address = ''
  Socket.ip_address_list.each do |addr_info|
    addr = addr_info.ip_address
    my_ip_address = addr if addr =~ Local_Network
  end
  raise "couldn't figure out my ip address" if my_ip_address.length==0

  # Each file in templates[] will get erb-expanded into a file of the same name (minus the trailing .erb)
  # Paths are relative to root_dir

  # SK added
  # - .env.erb        (for yarn run serve)
  templates = %w(
    stack/docker/nginx/nginx.conf.erb
    stack/docker/docker-compose.yml.erb
    python/python-coproc/export_env.erb
    app/content/.env.erb
  )

  templates.each do |tmplt|
    src = root_dir+"/"+tmplt
    tgt = src.sub(/\.erb$/,'')
    erb = File.read(src)
    result = Erubis::Eruby.new(erb).result(binding())
    File.open(tgt, "w") { |f| f.puts(result); puts("Wrote #{tgt}");}
  end

end



if __FILE__==$0

  require 'optparse'
  require 'ostruct'


  opts = OpenStruct.new
  # Defaults:
  opts[:port]          = '80'
  opts[:share]         = "#{ENV['HOME']}/shared"
  opts[:mongo_url]     = "mongodb://#{Erdos}:27017"
  opts[:mongo_db_name] = "internal_tools_gester"

  # Process commandline options:
  OptionParser.new do |parser|
    parser.on('--prod',
              'serve app/dist rather than webpack dev_server'
             ) { |o| opts.prod = o }

    parser.on('-p PORT',
              '--port PORT',
              "set the entry port for nginx (default: #{opts.port})"
             ) { |o| opts.port = o }

    parser.on('--share DIR',
              "location for the file share (default: #{opts.share})"
             ) { |o| opts.share = o }


    opts.usage = parser.help
  end.parse!

  main(opts)
end
